import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
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
  refreshAuth: () => Promise<void>;
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
  const navigate = useNavigate();

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
            await refreshAuthIfNeeded();
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

  const refreshAuthIfNeeded = async () => {
    if (refreshTokenValue) {
      try {
        const response = await refreshToken();
        if (response.success) {
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          return;
        }
        throw new Error('Refresh token failed');
      } catch (error) {
        console.error('Token refresh failed:', error);
        await handleInvalidAuth();
      }
    }
  };

  const handleInvalidAuth = async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setRefreshTokenValue(null);
    navigate('/login');
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
      navigate('/profile');
    } catch (error) {
      console.error('Failed to store login data:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setRefreshTokenValue(null);
    navigate('/login');
  };

  const refreshAuth = async () => {
    if (!refreshTokenValue) {
      await handleInvalidAuth();
      return;
    }

    try {
      const response = await refreshToken();
      if (response.success) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        setRefreshTokenValue(response.data.refreshToken);
      } else {
        await handleInvalidAuth();
      }
    } catch (error) {
      console.error('Manual refresh failed:', error);
      await handleInvalidAuth();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-600">Loading authentication...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading, refreshAuth }}>
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