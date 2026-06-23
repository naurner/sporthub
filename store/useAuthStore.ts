import { create } from 'zustand';
import { User } from '../types/user';
import { MOCK_USER } from '../services/mockData';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: MOCK_USER,
  isAuthenticated: true,
  setUser: (user) => set({ currentUser: user, isAuthenticated: !!user }),
}));
