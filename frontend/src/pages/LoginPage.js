import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage = ({ history }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    await login(email, password);
    history.push('/dashboard');
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
