import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const TaskForm = ({ task, onSave }) => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: task ? task.name : '',
    description: task ? task.description : '',
    dueDate: task ? task.dueDate : '',
    priority: task ? task.priority : 'low',
    status: task ? task.status : 'pending',
  });

  const { name, description, dueDate, priority, status } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const method = task ? 'PUT' : 'POST';
    const url = task ? `/api/tasks/${task._id}` : '/api/tasks';
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    onSave(data);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" value={name} onChange={onChange} placeholder="Task Name" required />
      <textarea name="description" value={description} onChange={onChange} placeholder="Description" />
      <input type="date" name="dueDate" value={dueDate} onChange={onChange} />
      <select name="priority" value={priority} onChange={onChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select name="status" value={status} onChange={onChange}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
