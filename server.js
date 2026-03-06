const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static(__dirname));

const server = http.createServer(app);
const io = new Server(server);

// ── 퀴즈 데이터 로드 ─────────────────────────────────
const allQuizData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'quiz.json'), 'utf-8'),
);

// 2. 무작위로 20개 추출하는 로직
const getRandomQuizzes = (data, count) => {
  // 데이터를 복사한 뒤 무작위로 섞습니다. (Fisher-Yates Shuffle 알고리즘의 간소화 버전)
  const shuffled = [...data].sort(() => 0.5 - Math.random());

  // 앞에서부터 count(20)개만큼 잘라서 반환합니다.
  return shuffled.slice(0, count);
};

// 3. 결과 저장
const quizData = getRandomQuizzes(allQuizData, 20);

// ── 방 상태 관리 ──────────────────────────────────────
// rooms[roomName] = {
//   players: [socketId, socketId],
//   scores: { socketId: number },
//   currentQuestion: number,
//   answers: { socketId: optionIndex }
// }
const rooms = {};

// ── 라우팅 ────────────────────────────────────────────
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/html/socket_test.html');
// });

app.get('/quiz', (req, res) => {
  res.sendFile(__dirname + '/html/quiz.html');
});

// ── 유틸 함수 ─────────────────────────────────────────
function sendQuestion(roomName) {
  const room = rooms[roomName];
  const q = quizData[room.currentQuestion];

  io.to(roomName).emit('new question', {
    index: room.currentQuestion,
    total: quizData.length,
    question: q.question,
    options: q.options,
  });
}

function sendResult(roomName) {
  const room = rooms[roomName];
  const [p1, p2] = room.players;

  const result = {
    scores: {
      [p1]: room.scores[p1],
      [p2]: room.scores[p2],
    },
    players: room.players,
  };

  io.to(roomName).emit('game over', result);

  // 방 정리
  delete rooms[roomName];
}

// ── 소켓 이벤트 ───────────────────────────────────────
io.on('connection', (socket) => {
  console.log('접속자:', socket.id);

  // 기존 채팅용 이벤트 (유지)
  socket.on('chat message', (data) => {
    const { room, msg } = data;
    io.to(room).emit('chat message', msg);
  });

  // ── 퀴즈 방 입장 ──────────────────────────────────
  socket.on('join room', (roomName) => {
    socket.join(roomName);
    console.log(`${socket.id}님이 [${roomName}] 방에 입장`);

    // 방이 없으면 새로 생성
    if (!rooms[roomName]) {
      rooms[roomName] = {
        players: [],
        scores: {},
        currentQuestion: 0,
        answers: {},
      };
    }

    const room = rooms[roomName];

    // 이미 입장한 플레이어인지 확인
    if (room.players.includes(socket.id)) return;

    // 방 인원 초과 체크
    if (room.players.length >= 2) {
      socket.emit('room full');
      return;
    }

    room.players.push(socket.id);
    room.scores[socket.id] = 0;

    // 입장 알림
    io.to(roomName).emit('player joined', {
      playerCount: room.players.length,
    });

    // 2명이 모이면 게임 시작
    if (room.players.length === 2) {
      console.log(`[${roomName}] 게임 시작!`);
      io.to(roomName).emit('game start', {
        totalQuestions: quizData.length,
      });

      // 1초 후 첫 문제 전송
      setTimeout(() => sendQuestion(roomName), 1000);
    }
  });

  // ── 답변 제출 ─────────────────────────────────────
  socket.on('submit answer', (data) => {
    const { room: roomName, answer } = data;
    const room = rooms[roomName];

    if (!room) return;

    // 이미 답변했으면 무시
    if (room.answers[socket.id] !== undefined) return;

    // 답변 기록
    room.answers[socket.id] = answer;

    // 정답 체크
    const correctAnswer = quizData[room.currentQuestion].answer;
    const isCorrect = answer === correctAnswer;
    if (isCorrect) {
      room.scores[socket.id]++;
    }

    // 정답을 맞춘 경우 → 즉시 라운드 종료
    if (isCorrect) {
      // 양쪽 모두에게 라운드 결과 알림
      io.to(roomName).emit('round end', {
        correctAnswer: correctAnswer,
        winnerId: socket.id,
      });

      // 다음 문제로 진행
      room.answers = {};
      room.currentQuestion++;

      if (room.currentQuestion < quizData.length) {
        setTimeout(() => sendQuestion(roomName), 2000);
      } else {
        setTimeout(() => sendResult(roomName), 2000);
      }
      return;
    }

    // 오답인 경우 → 본인에게만 오답 알림
    socket.emit('answer result', {
      correct: false,
      correctAnswer: correctAnswer,
      yourAnswer: answer,
    });

    // 두 명 모두 답변했는데 둘 다 오답 → 다음 문제로
    const bothAnswered = room.players.every(
      (pid) => room.answers[pid] !== undefined,
    );

    if (bothAnswered) {
      io.to(roomName).emit('round end', {
        correctAnswer: correctAnswer,
        winnerId: null,
      });

      room.answers = {};
      room.currentQuestion++;

      if (room.currentQuestion < quizData.length) {
        setTimeout(() => sendQuestion(roomName), 2000);
      } else {
        setTimeout(() => sendResult(roomName), 2000);
      }
    }
  });

  // ── 접속 종료 ─────────────────────────────────────
  socket.on('disconnect', () => {
    console.log('접속 종료:', socket.id);

    // 게임 중인 방에서 나가면 상대방에게 알림
    for (const [roomName, room] of Object.entries(rooms)) {
      if (room.players.includes(socket.id)) {
        io.to(roomName).emit('opponent left');
        delete rooms[roomName];
        break;
      }
    }
  });
});

// ── 서버 시작 ─────────────────────────────────────────
server.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
