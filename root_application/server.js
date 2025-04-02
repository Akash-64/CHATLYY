const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use((req, res, next) => {
  if(req.path === '/' && !req.query.name) {
      res.redirect('/publicjoin.html');
  } else {
      next();
  }
});
app.use(express.static(__dirname, {
  extensions: ['html', 'htm'],
  setHeaders: (res, path) => {
      if(path.endsWith('index.html') && !res.req.query.name) {
          res.redirect(302, '/publicjoin.html');
      }
  }
}));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store active users and chat rooms
const users = {};
const rooms = {
  'public': { users: [] }
};

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join', (data) => {
    const { username, roomName, isPrivate, pin } = data;
    
    // Store user information
    users[socket.id] = { username, room: roomName };
    
    // Create room if it doesn't exist
    if (!rooms[roomName]) {
      rooms[roomName] = {
        users: [],
        isPrivate: isPrivate || false,
        pin: pin || null
      };
    }
    
    // Join socket to room
    socket.join(roomName);
    rooms[roomName].users.push(socket.id);
    
    // Notify room about new user
    io.to(roomName).emit('userJoined', {
      user: username,
      users: rooms[roomName].users.map(id => users[id].username)
    });
    
    console.log(`${username} joined ${roomName}`);
  });

  socket.on('message', (data) => {
    const user = users[socket.id];
    if (user) {
      io.to(user.room).emit('message', {
        text: data.text,
        sender: user.username,
        timestamp: new Date().toISOString()
      });
    }
  });

  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      const room = rooms[user.room];
      if (room) {
        // Remove user from room
        room.users = room.users.filter(id => id !== socket.id);
        
        // Notify room about user leaving
        io.to(user.room).emit('userLeft', {
          user: user.username,
          users: room.users.map(id => users[id].username)
        });
      }
      delete users[socket.id];
    }
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});