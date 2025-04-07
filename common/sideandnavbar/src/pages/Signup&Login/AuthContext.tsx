import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { UserType } from '../../enums/userType';
import { refreshToken } from '../../services/authAPI';

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
  login: (userData: AuthUser, token: string, refreshToken?: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("AuthProvider Mounted");

      const token = localStorage.getItem('authToken');
      const storedUserData = localStorage.getItem('user');
      const storedRefreshToken = localStorage.getItem('refreshToken');

      if (token && storedUserData) {
        try {
          const parsedUser = JSON.parse(storedUserData) as AuthUser;
          setUser(parsedUser);
          setIsAuthenticated(true);
          if (storedRefreshToken) {
            setRefreshTokenValue(storedRefreshToken);
          }
        } catch (error) {
          console.error('Failed to parse stored user data:', error);
          await handleInvalidAuth();
        }
      }
      
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const handleInvalidAuth = async () => {
    if (refreshTokenValue) {
      try {
        const response = await refreshToken();
        if (response.success) {
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          return;
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
    }
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setRefreshTokenValue(null);
  };

  const login = (userData: AuthUser, token: string, refreshToken?: string) => {
    if (!userData || !token) {
      console.error('Invalid login data:', { userData, token });
      return;
    }

    try {
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
        setRefreshTokenValue(refreshToken);
      }

      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to store login data:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setRefreshTokenValue(null);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};