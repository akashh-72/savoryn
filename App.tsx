import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Feed } from './pages/Feed';
import { Explore } from './pages/Explore';
import { Create } from './pages/Create';
import { Messages } from './pages/Messages';
import { Profile } from './pages/Profile';
import { UserProfile } from './pages/UserProfile';
import { Auth } from './pages/Auth';
import { ReelScreen } from './pages/ReelScreen';
import { Settings } from './pages/Settings';

const App: React.FC = () => {
  // Check localStorage for persisted auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('savoryn_auth') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('savoryn_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('savoryn_auth');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
        
        <Route 
          path="/" 
          element={isAuthenticated ? <Feed /> : <Navigate to="/auth" replace />} 
        />
        <Route 
          path="/explore" 
          element={isAuthenticated ? <Explore /> : <Navigate to="/auth" replace />} 
        />
        <Route 
          path="/create" 
          element={isAuthenticated ? <Create /> : <Navigate to="/auth" replace />} 
        />
        <Route 
          path="/messages" 
          element={isAuthenticated ? <Messages /> : <Navigate to="/auth" replace />} 
        />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/auth" replace />} 
        />
        <Route 
          path="/user/:userId" 
          element={isAuthenticated ? <UserProfile /> : <Navigate to="/auth" replace />} 
        />
        <Route
          path="/reels"
          element={isAuthenticated ? <ReelScreen /> : <Navigate to="/auth" replace />}
        />
        <Route 
          path="/settings" 
          element={isAuthenticated ? <Settings onLogout={handleLogout} /> : <Navigate to="/auth" replace />} 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;