

# MERN Task Manager

The MERN Task Manager is a comprehensive task management application built using the MERN stack (MongoDB, Express, React, Node.js). This application allows users to register, log in, and manage their tasks in real-time with the help of Socket.IO.

## Features

The application includes several key features: user authentication (registration and login), task creation, update, and deletion, real-time task updates using Socket.IO, and a responsive design for optimal viewing on various devices.

## Prerequisites

Before setting up the project, ensure you have the following software installed: Node.js (version 14 or higher), npm (version 6 or higher), and MongoDB (either locally installed or MongoDB Atlas for cloud-based usage).

## Installation

### Backend

To set up the backend, clone the repository and navigate to the backend directory. Install the necessary dependencies using npm.

### Frontend

Next, navigate to the frontend directory and install the required dependencies.

## Configuration

### Backend

Create a `.env` file in the backend directory with the necessary environment variables for MongoDB URI and JWT secret key.

### Frontend

Create a `src/socket.js` file in the frontend directory to initialize the Socket.IO client with the backend server URL.

## Running the Application

### Backend

Start the MongoDB server if it is not already running. Then start the backend server using npm.

### Frontend

In a new terminal window/tab, navigate to the frontend directory and start the frontend development server. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

The application includes several API endpoints for user authentication and task management.

### Auth Routes

- Register a new user.
- Login a user.
- Get authenticated user.

### Task Routes

- Create a new task.
- Get all tasks for the authenticated user.
- Update a task.
- Delete a task.

## Socket.IO Integration

Socket.IO is integrated for real-time task updates. On the backend, Socket.IO is set up to handle connection events and broadcast task-related events. On the frontend, the Socket.IO client is initialized and used in components to handle real-time events.

## Sample Data

To import sample data into your MongoDB database, create a JSON file with sample user and task data. Then, create a script to read the JSON file and insert the data into the database. Run the script to import the data.

