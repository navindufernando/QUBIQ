import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { UserType } from '../../enums/userType';

interface AuthUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: UserType;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (userData: AuthUser, token: string) => void;
  logout: () => void;
}

// Create context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

// Inside the AuthContext
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {

    console.log("AuthProvider Mounted");

    // Try to get authentication data from localStorage on initial load
    const token = localStorage.getItem('authToken');
    const storedUserData = localStorage.getItem('user');

    console.log("TOKEN: ", token);
    console.log("USER DATA: ", storedUserData);

    if (token && storedUserData) {
      try {
        const parsedUser = JSON.parse(storedUserData) as AuthUser;
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = (userData: AuthUser, token: string) => {
    if (!userData || !token) {
      console.error('Invalid login data:', { userData, token });
      return;
    }

    // Store in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));

    // Update state and trigger re-render
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Clear from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Update state and trigger re-render
    setUser(null);
    setIsAuthenticated(false);
  };

  // Show loading state or render children
  if (isLoading) {
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// Custom hook for using Auth Context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  return context;
};