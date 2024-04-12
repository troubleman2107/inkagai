import { create } from "zustand";

// type userInfo = {
//   id: string;
//   email: string;
//   plan: string;
//   button_click: number;
//   setUser?: (value: object) => void;
// };

interface userInfo {
  id?: string | undefined | null;
  email?: string | undefined | null;
  plan?: string | undefined | null;
  button_click?: number | undefined | null;
}

interface setVoid extends userInfo {
  setUser?: (value: userInfo) => void | undefined;
}

export const useUserStore = create<setVoid>((set) => ({
  id: null,
  email: null,
  plan: null,
  button_click: undefined,
  setUser: (value: userInfo) => set((state) => ({ ...state, ...value })),
}));
