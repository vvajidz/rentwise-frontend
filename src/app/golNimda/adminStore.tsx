import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Admin = {
  id: string;
  email: string;
  name: string;
  role: 'admin';
  token: string;
};

type AdminAuthState = {
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (adminData: Admin) => void;
  logout: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useAdminStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      admin: null,
      isAuthenticated: false,
      loading: false,
      login: (adminData) =>
        set({ admin: adminData, isAuthenticated: true }),
      logout: () => {
        set({ admin: null, isAuthenticated: false });
        localStorage.removeItem('admin-storage');
      },
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'admin-storage',
    }
  )
);
