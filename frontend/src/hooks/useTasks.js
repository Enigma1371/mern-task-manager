import { useState, useEffect } from 'react';

const useTasks = token => {
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

  return tasks;
};

export default useTasks;
