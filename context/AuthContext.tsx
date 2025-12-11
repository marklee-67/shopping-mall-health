import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  phone: string;
  address: string;
}

interface AuthContextType {
  user: User | null;
  login: (id: string) => void;
  signup: (id: string, name: string, phone: string, address: string) => void;
  logout: () => void;
  updateUser: (name: string) => void;
  resetPassword: (email: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to null (not logged in) for testing the feature
  const [user, setUser] = useState<User | null>(null);

  const login = (id: string) => {
    // For mock login, we provide default values for phone and address
    setUser({ 
        id, 
        name: '김건강',
        phone: '010-1234-5678',
        address: '서울특별시 강남구 테헤란로 123, 45층'
    });
  };

  const signup = (id: string, name: string, phone: string, address: string) => {
    // In a real app, this would make an API call. 
    // For this mock, we immediately log the user in with provided details.
    setUser({ id, name, phone, address });
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (name: string) => {
    if (user) {
        setUser({ ...user, name });
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would send a request to the backend
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, resetPassword, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};