MERN Task Manager
The MERN Task Manager is a comprehensive task management application built using the MERN stack (MongoDB, Express, React, Node.js). This application allows users to register, log in, and manage their tasks in real-time with the help of Socket.IO.

Features
The application includes several key features: user authentication (registration and login), task creation, update, and deletion, real-time task updates using Socket.IO, and a responsive design for optimal viewing on various devices.

Prerequisites
Before setting up the project, ensure you have the following software installed: Node.js (version 14 or higher), npm (version 6 or higher), and MongoDB (either locally installed or MongoDB Atlas for cloud-based usage).

Installation
Backend
To set up the backend, clone the repository and navigate to the backend directory. Install the necessary dependencies using npm:

bash
Copy code
git clone https://github.com/yourusername/mern-task-manager.git
cd mern-task-manager/backend
npm install
Frontend
Next, navigate to the frontend directory and install the required dependencies:

bash
Copy code
cd ../frontend
npm install
Configuration
Backend
Create a .env file in the backend directory with the following content:

plaintext
Copy code
MONGO_URI=mongodb://localhost:27017/task_manager
JWT_SECRET=your_jwt_secret_key
Replace your_jwt_secret_key with a secure key for JWT.

Frontend
Create a src/socket.js file in the frontend directory to initialize the Socket.IO client:

javascript
Copy code
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling', 'flashsocket'],
});

export default socket;
Running the Application
Backend
Start the MongoDB server if it is not already running:

bash
Copy code
mongod
Then start the backend server:

bash
Copy code
npm run server
Frontend
In a new terminal window/tab, navigate to the frontend directory and start the frontend development server:

bash
Copy code
cd ../frontend
npm start
Open your browser and navigate to http://localhost:3000.

API Endpoints
Auth Routes
POST /api/auth/register: Register a new user
POST /api/auth/login: Login a user
GET /api/auth/user: Get authenticated user
Task Routes
POST /api/tasks: Create a new task
GET /api/tasks: Get all tasks for the authenticated user
PUT /api/tasks/:id: Update a task
DELETE /api/tasks/:id: Delete a task
Socket.IO Integration
Socket.IO is integrated for real-time task updates. On the backend, Socket.IO is set up in server.js to handle connection events and broadcast task-related events:

javascript
Copy code
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
On the frontend, the Socket.IO client is initialized in src/socket.js and can be used in components to handle real-time events:

javascript
Copy code
import socket from './socket';

// Listen for taskCreated events
socket.on('taskCreated', (task) => {
  // Handle task creation
});

// Listen for taskUpdated events
socket.on('taskUpdated', (task) => {
  // Handle task update
});

// Listen for taskDeleted events
socket.on('taskDeleted', (taskId) => {
  // Handle task deletion
});
Sample Data
To import sample data into your MongoDB database, create a sampleData.json file with the following content:

json
Copy code
{
  "users": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "$2a$10$V9DPmQ7QiRBHgLDDFHwwDeJjP39esGf/COdf8Fp06c5u4A2D7eU5W",
      "date": "2024-07-06T12:34:56.789Z"
    }
  ],
  "tasks": [
    {
      "user": "userObjectId",
      "name": "Sample Task 1",
      "description": "This is a sample task description.",
      "dueDate": "2024-07-07T12:34:56.789Z",
      "priority": "high",
      "status": "pending",
      "date": "2024-07-06T12:34:56.789Z"
    },
    {
      "user": "userObjectId",
      "name": "Sample Task 2",
      "description": "This is another sample task description.",
      "dueDate": "2024-07-08T12:34:56.789Z",
      "priority": "medium",
      "status": "in-progress",
      "date": "2024-07-06T12:34:56.789Z"
    }
  ]
}
Replace userObjectId with the actual user _id after importing users. To import this data into your MongoDB database, you can create an importData.js script:

javascript
Copy code
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Task = require('./models/Task');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const data = JSON.parse(fs.readFileSync('sampleData.json', 'utf-8'));

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Task.deleteMany({});

    const users = await User.insertMany(data.users);

    const tasks = data.tasks.map(task => {
      task.user = users[0]._id;
      return task;
    });
    await Task.insertMany(tasks);

    console.log('Data imported successfully');
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

importData();
Run the script to import the data:

bash
Copy code
node importData.js
License
This project is licensed under the MIT License. See the LICENSE file for details.

This README file provides detailed information about setting up, configuring, and running your MERN Task Manager project. It includes instructions for both backend and frontend setups, API endpoints, Socket.IO integration, and sample data import.







