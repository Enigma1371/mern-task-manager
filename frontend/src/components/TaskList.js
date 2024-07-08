import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const TaskList = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks', {
        headers: { 'x-auth-token': token },
      });
      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();
  }, [token]);

  const deleteTask = async id => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { 'x-auth-token': token },
    });
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <Link to={`/task/${task._id}`}>{task.name}</Link>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
