const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/client.html');
});

io.on('connection', (socket) => {
  console.log('접속자:', socket.id);

  socket.on('join room', (roomName) => {
    socket.join(roomName);
    console.log(`${socket.id}님이 [${roomName}] 방에 입장`);
  });

  socket.on('chat message', (data) => {
    const { room, msg } = data;
    io.to(room).emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('접속 종료');
  });
});

server.listen(3000, () => {
  console.log('서버가 http://10.10.0.40:3000 에서 실행 중입니다.');
});
