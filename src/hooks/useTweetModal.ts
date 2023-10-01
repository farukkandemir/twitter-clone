import { create } from "zustand";

type TweetModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useTweetModal = create<TweetModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useTweetModal;
