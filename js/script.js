// ── 소켓 연결 ────────────────────────────
// io() 내부에 IPv4 주소를 추후 넣으면 됨
const socket = io();
let currentRoom = '';
let myScore = 0;
let opponentScore = 0;
let myHp = 10;
let opponentHp = 10;
const MAX_HP = 10;

// HP 바 렌더링 함수
function updateHpBars() {
  const myBar = document.getElementById('my-hp-bar');
  const opponentBar = document.getElementById('opponent-hp-bar');
  const myText = document.getElementById('my-hp-text');
  const opponentText = document.getElementById('opponent-hp-text');

  const myPercent = (myHp / MAX_HP) * 100;
  const opponentPercent = (opponentHp / MAX_HP) * 100;

  myBar.style.width = myPercent + '%';
  opponentBar.style.width = opponentPercent + '%';

  // 색상 변경: HP가 낮으면 빨간색
  myBar.style.backgroundColor =
    myPercent > 50 ? '#22c55e' : myPercent > 20 ? '#eab308' : '#ef4444';
  opponentBar.style.backgroundColor =
    opponentPercent > 50
      ? '#22c55e'
      : opponentPercent > 20
        ? '#eab308'
        : '#ef4444';

  myText.textContent = myHp + ' / ' + MAX_HP;
  opponentText.textContent = opponentHp + ' / ' + MAX_HP;
}

// HP 데이터 파싱 (서버에서 socketId 기반으로 오므로 변환)
function parseHp(hpData) {
  const myId = socket.id;
  const opponentId = Object.keys(hpData).find((id) => id !== myId);
  myHp = hpData[myId];
  opponentHp = hpData[opponentId];
}

// ── 방 입장 ──────────────────────────────
function joinRoom() {
  const input = document.getElementById('room-input');
  const roomName = input.value.trim();
  if (!roomName) return;

  currentRoom = roomName;
  socket.emit('join room', currentRoom);

  showScreen('waiting-area');
}

// ── 화면 전환 유틸 ───────────────────────
function showScreen(screenId) {
  ['room-selection', 'waiting-area', 'quiz-area', 'result-area'].forEach(
    (id) => {
      document.getElementById(id).style.display = 'none';
    },
  );
  document.getElementById(screenId).style.display = 'block';
}

function showNotification(msg, duration = 2000) {
  const el = document.getElementById('notification');
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => {
    el.style.display = 'none';
  }, duration);
}

// ── 소켓 이벤트: 입장 / 대기 ─────────────
socket.on('player joined', (data) => {
  document.getElementById('player-count').textContent = data.playerCount;
});

socket.on('room full', () => {
  showNotification('방이 가득 찼습니다!');
  showScreen('room-selection');
});

// ── 소켓 이벤트: 게임 시작 ────────────────
socket.on('game start', (data) => {
  showNotification('게임 시작!');
  myScore = 0;
  opponentScore = 0;
  myHp = MAX_HP;
  opponentHp = MAX_HP;
});

// ── 소켓 이벤트: 새 문제 ──────────────────
socket.on('new question', (data) => {
  showScreen('quiz-area');

  // HP 업데이트
  if (data.hp) {
    parseHp(data.hp);
    updateHpBars();
  }

  // 진행 상태 업데이트
  document.getElementById('quiz-progress').textContent = `Q${data.index + 1}`;

  // 문제 표시
  document.getElementById('question-text').textContent = data.question;

  // 선택지 렌더링
  const optionsEl = document.getElementById('options');
  optionsEl.innerHTML = '';
  data.options.forEach((option, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = `${idx + 1}. ${option}`;
    btn.onclick = () => submitAnswer(idx + 1);
    optionsEl.appendChild(btn);
  });

  // 대기 메시지 숨기기
  document.getElementById('waiting-opponent').textContent = '';
});

// ── 답변 제출 ─────────────────────────────
function submitAnswer(answerIndex) {
  socket.emit('submit answer', {
    room: currentRoom,
    answer: answerIndex,
  });

  // 버튼 비활성화
  document.querySelectorAll('.option-btn').forEach((btn) => {
    btn.disabled = true;
  });
}

// ── 소켓 이벤트: 오답 알림 (본인에게만) ─────
socket.on('answer result', (data) => {
  const buttons = document.querySelectorAll('.option-btn');

  // 내가 고른 답 오답 표시
  buttons[data.yourAnswer].classList.add('wrong');

  document.getElementById('waiting-opponent').textContent =
    '상대방 답변 대기 중...';
});

// ── 소켓 이벤트: 라운드 종료 ────────────────
socket.on('round end', (data) => {
  const buttons = document.querySelectorAll('.option-btn');

  // 모든 버튼 비활성화
  buttons.forEach((btn) => {
    btn.disabled = true;
  });

  // 정답 표시
  buttons[data.correctAnswer].classList.add('correct');

  // HP 업데이트
  if (data.hp) {
    parseHp(data.hp);
    updateHpBars();
  }

  // 누가 맞췄는지 표시
  if (data.winnerId === socket.id) {
    myScore++;
    document.getElementById('waiting-opponent').textContent =
      '정답! 상대방 HP -1 💥';
  } else if (data.winnerId) {
    opponentScore++;
    document.getElementById('waiting-opponent').textContent =
      '상대방이 먼저 맞췄습니다! 내 HP -1 💔';
  } else {
    document.getElementById('waiting-opponent').textContent =
      '둘 다 틀렸습니다! 다음 문제로 이동합니다...';
  }
});

// ── 소켓 이벤트: 게임 종료 ────────────────
socket.on('game over', (data) => {
  showScreen('result-area');

  const myId = socket.id;
  const opponentId = data.players.find((id) => id !== myId);
  const myFinalScore = data.scores[myId];
  const opponentFinalScore = data.scores[opponentId];
  const myFinalHp = data.hp[myId];
  const opponentFinalHp = data.hp[opponentId];

  document.getElementById('my-score').textContent = myFinalScore;
  document.getElementById('opponent-score').textContent = opponentFinalScore;
  document.getElementById('my-final-hp').textContent = myFinalHp;
  document.getElementById('opponent-final-hp').textContent = opponentFinalHp;

  const titleEl = document.getElementById('result-title');
  const subtitleEl = document.getElementById('result-subtitle');

  if (data.winnerId === myId) {
    titleEl.textContent = '🎉 승리!';
    titleEl.className = 'result-title win';
    subtitleEl.textContent = '상대방을 처치했습니다!';
  } else {
    titleEl.textContent = '💀 패배';
    titleEl.className = 'result-title lose';
    subtitleEl.textContent = 'HP가 모두 소진되었습니다...';
  }
});

// ── 소켓 이벤트: 상대방 퇴장 ──────────────
socket.on('opponent left', () => {
  showNotification('상대방이 나갔습니다', 3000);
  setTimeout(() => location.reload(), 2000);
});

function GoLogin() {
  location.href = 'html/joinForm.html';
}
