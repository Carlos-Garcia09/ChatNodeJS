const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('chat message', (msg, username) => {
    io.emit('chat message', { message: msg, user: username });
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
