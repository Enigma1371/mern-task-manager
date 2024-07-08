const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Connect to the database
connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

// Define routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('taskCreated', (task) => {
    socket.broadcast.emit('taskCreated', task);
  });

  socket.on('taskUpdated', (task) => {
    socket.broadcast.emit('taskUpdated', task);
  });

  socket.on('taskDeleted', (taskId) => {
    socket.broadcast.emit('taskDeleted', taskId);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
