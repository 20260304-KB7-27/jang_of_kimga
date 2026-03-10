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

// 무작위로 섞는 로직 (게임 시작 시 방마다 호출)
function getShuffledQuizzes(data) {
  const shuffled = [...data];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// HP 설정
const MAX_HP = 3;

// ── 방 상태 관리 ──────────────────────────────────────
// rooms[roomName] = {
//   players: [socketId, socketId],
//   teams: { socketId: teamName },
//   scores: { socketId: number },
//   hp: { socketId: number },
//   currentQuestion: number,
//   answers: { socketId: optionIndex }
// }
const rooms = {};

// ── 라우팅 ────────────────────────────────────────────

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});

app.get('/html/joinForm.html', (req, res) => {
  res.sendFile(__dirname + '/html/joinForm.html');
});

app.get('/quiz', (req, res) => {
  res.sendFile(__dirname + '/html/quiz.html');
});

// ── 유틸 함수 ─────────────────────────────────────────
function sendQuestion(roomName) {
  const room = rooms[roomName];
  // 문제 인덱스가 전체 문제 수를 넘으면 순환
  const qIndex = room.currentQuestion % room.quizData.length;
  const q = room.quizData[qIndex];

  const [p1, p2] = room.players;

  io.to(roomName).emit('new question', {
    index: room.currentQuestion,
    total: MAX_HP,
    question: q.question,
    description: q.description,
    options: q.options,
    hp: {
      [p1]: room.hp[p1],
      [p2]: room.hp[p2],
    },
    players: room.players,
    teams: {
      [p1]: room.teams[p1],
      [p2]: room.teams[p2],
    },
  });
}

function sendResult(roomName) {
  const room = rooms[roomName];
  const [p1, p2] = room.players;

  // HP가 0인 플레이어가 패배
  const loserId = room.hp[p1] <= 0 ? p1 : p2;
  const winnerId = loserId === p1 ? p2 : p1;

  const result = {
    scores: {
      [p1]: room.scores[p1],
      [p2]: room.scores[p2],
    },
    hp: {
      [p1]: room.hp[p1],
      [p2]: room.hp[p2],
    },
    // 팀명 추가 0310
    teams: {
      [p1]: room.teams[p1],
      [p2]: room.teams[p2],
    },
    players: room.players,
    winnerId: winnerId,
    loserId: loserId,
  };

  // 게임 종료 플래그 설정 (disconnect 시 opponent left 방지)
  room.gameOver = true;

  io.to(roomName).emit('game over', result);

  // 모든 플레이어를 Socket.IO 방에서 퇴장시킴
  // (리로드한 사람이 다시 join해도 상대방에게 이벤트가 가지 않도록)
  room.players.forEach((pid) => {
    const playerSocket = io.sockets.sockets.get(pid);
    if (playerSocket) playerSocket.leave(roomName);
  });

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
  socket.on('join room', ({ room: roomName, team }) => {
    socket.join(roomName);
    console.log(`${socket.id}님이 [${roomName}] 방에 입장`);

    // 방이 없으면 새로 생성 - 팀명 추가 0310
    if (!rooms[roomName]) {
      rooms[roomName] = {
        players: [],
        teams: {},
        scores: {},
        hp: {},
        currentQuestion: 0,
        answers: {},
        quizData: [],  // 게임 시작 시 셔플하여 채움
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

    // 팀명추가 0310
    room.players.push(socket.id);
    room.teams[socket.id] = team || `팀${room.players.length}`;
    room.scores[socket.id] = 0;
    room.hp[socket.id] = MAX_HP;

    // 입장 알림
    io.to(roomName).emit('player joined', {
      playerCount: room.players.length,
    });

    // 2명이 모이면 게임 시작
    if (room.players.length === 2) {
      console.log(`[${roomName}] 게임 시작!`);

      // 게임 시작 시 문제를 새로 셔플
      room.quizData = getShuffledQuizzes(allQuizData);

      const [p1, p2] = room.players;

      io.to(roomName).emit('game start', {
        totalQuestions: room.quizData.length,

        teams: {
          [p1]: room.teams[p1],
          [p2]: room.teams[p2],
        },
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
    const correctAnswer =
      room.quizData[room.currentQuestion % room.quizData.length].answer;
    const isCorrect = answer === correctAnswer;
    if (isCorrect) {
      room.scores[socket.id]++;

      // 상대방 HP 감소
      const opponentId = room.players.find((pid) => pid !== socket.id);
      room.hp[opponentId]--;
    }

    // 정답을 맞춘 경우 → 즉시 라운드 종료
    if (isCorrect) {
      const [p1, p2] = room.players;

      // 양쪽 모두에게 라운드 결과 알림 (HP 정보 포함)
      io.to(roomName).emit('round end', {
        correctAnswer: correctAnswer,
        winnerId: socket.id,
        hp: {
          [p1]: room.hp[p1],
          [p2]: room.hp[p2],
        },
      });

      // HP가 0 이하인 플레이어가 있으면 게임 종료
      const isDead = room.players.some((pid) => room.hp[pid] <= 0);
      if (isDead) {
        setTimeout(() => sendResult(roomName), 2000);
        return;
      }

      // 다음 문제로 진행
      room.answers = {};
      room.currentQuestion++;

      setTimeout(() => sendQuestion(roomName), 2000);
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
      const [p1, p2] = room.players;

      io.to(roomName).emit('round end', {
        correctAnswer: correctAnswer,
        winnerId: null,
        hp: {
          [p1]: room.hp[p1],
          [p2]: room.hp[p2],
        },
      });

      room.answers = {};
      room.currentQuestion++;

      setTimeout(() => sendQuestion(roomName), 2000);
    }
  });

  // ── 접속 종료 ─────────────────────────────────────
  socket.on('disconnect', () => {
    console.log('접속 종료:', socket.id);

    // 게임 중인 방에서 나가면 상대방에게 알림
    for (const [roomName, room] of Object.entries(rooms)) {
      if (room.players.includes(socket.id)) {
        // 게임이 이미 끝났으면 opponent left를 보내지 않음
        if (!room.gameOver) {
          io.to(roomName).emit('opponent left');
        }
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
