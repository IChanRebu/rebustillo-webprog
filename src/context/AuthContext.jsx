import { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = AuthService.getAuth();
    setCurrentUser(auth);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
