import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface SupabaseContextType {
  api: any;
  supabase: any;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface User {
  id: string;
  email: string;
  username?: string;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

interface SupabaseProviderProps {
  children: React.ReactNode;
}

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const API_BASE_URL = 'http://127.0.0.1:8000/api';
  
  const supabase = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Alias for compatibility
  const api = supabase;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('access_token');
    if (token) {
      supabase.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Verify token is still valid
      const userData = localStorage.getItem('user_data');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
    setLoading(false);
  }, [supabase]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await supabase.post('/auth/login/', { 
        username: email, // Django expects username field
        password 
      });
      const { access, refresh } = response.data;
      
      // Create user data from email
      const userData = {
        id: '1',
        email: email,
        username: email
      };
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      supabase.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      setUser(userData);
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    delete supabase.defaults.headers.common['Authorization'];
    setUser(null);
  };

  // Add request interceptor for token refresh
  supabase.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          try {
            const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
              refresh: refreshToken
            });
            const { access } = response.data;
            localStorage.setItem('access_token', access);
            supabase.defaults.headers.common['Authorization'] = `Bearer ${access}`;
            return supabase.request(error.config);
          } catch (refreshError) {
            logout();
          }
        } else {
          logout();
        }
      }
      return Promise.reject(error);
    }
  );
  
  return (
    <SupabaseContext.Provider value={{ api, supabase, user, loading, login, logout }}>
      {children}
    </SupabaseContext.Provider>
  );
};