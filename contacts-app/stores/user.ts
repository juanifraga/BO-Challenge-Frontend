import { defineStore } from 'pinia';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  isAuthenticated: boolean;
  user: User | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    initialize() {
      if (typeof window !== 'undefined') {
        this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
      }
    },
    login(user: User) {
      this.isAuthenticated = true;
      this.user = user;
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    },
  },
});