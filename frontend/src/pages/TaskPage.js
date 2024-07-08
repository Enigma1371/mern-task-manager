import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import TaskForm from '../components/TaskForm';

const TaskPage = ({ match }) => {
  const { token } = useContext(AuthContext);
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`/api/tasks/${match.params.id}`, {
        headers: { 'x-auth-token': token },
      });
      const data = await res.json();
      setTask(data);
    };

    fetchTask();
  }, [token, match.params.id]);

  return (
    <div>
      <h1>Task Details</h1>
      {task && <TaskForm task={task} />}
    </div>
  );
};

export default TaskPage;
