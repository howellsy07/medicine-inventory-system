import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('medicine-auth') === 'true',
  );

  const value = useMemo(() => ({
    isAuthenticated,
    login(username, password) {
      const isValid = username === 'pharmacist' && password === 'med123';
      if (isValid) {
        sessionStorage.setItem('medicine-auth', 'true');
        setIsAuthenticated(true);
      }
      return isValid;
    },
    logout() {
      sessionStorage.removeItem('medicine-auth');
      setIsAuthenticated(false);
    },
  }), [isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

