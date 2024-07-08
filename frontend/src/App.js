import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import TaskPage from './pages/TaskPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        
          <Route path="/login" component={LoginPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/task/:id" component={TaskPage} />
      </Router>
    </AuthProvider>
  );
};

export default App;
