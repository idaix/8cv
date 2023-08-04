import { create } from "zustand";

interface IProps {
  isOpen: boolean;
  type: "LOGIN" | "REGISTER";
  onOpen: (type: "LOGIN" | "REGISTER") => void;
  onClose: () => void;
}

export const useAuthModal = create<IProps>((set) => ({
  isOpen: false,
  type: "LOGIN",
  onOpen: (type: "LOGIN" | "REGISTER") => set({ isOpen: true, type: type }),
  onClose: () => set({ isOpen: false }),
}));
