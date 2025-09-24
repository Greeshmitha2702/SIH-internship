import { useState, useEffect } from 'react';
import { User, AuthState } from '../types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for existing session on app load
    const savedUser = localStorage.getItem('internai_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('internai_user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string, name?: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock authentication logic
    if (name) {
      // Sign up flow
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date()
      };

      localStorage.setItem('internai_user', JSON.stringify(newUser));
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      // Sign in flow - for demo, accept any email/password
      const existingUser: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0], // Use email prefix as name
        createdAt: new Date()
      };

      localStorage.setItem('internai_user', JSON.stringify(existingUser));
      setAuthState({
        user: existingUser,
        isAuthenticated: true,
        isLoading: false
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('internai_user');
    localStorage.removeItem('internshipCart');
    localStorage.removeItem('userProfile');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  return {
    ...authState,
    login,
    logout
  };
};