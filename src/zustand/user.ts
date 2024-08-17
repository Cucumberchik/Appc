import { create } from "zustand";

interface IUserZustand {
  user: UserType | null;
  setUser: (user: UserType) => void;
}

const useUser = create<IUserZustand>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUser;
