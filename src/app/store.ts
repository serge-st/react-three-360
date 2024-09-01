import { create } from "zustand";

type PlayerStore = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  resetVideoFn: undefined | (() => void);
  setResetVideoFn: (resetFunction: () => void) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
  resetVideoFn: undefined,
  setResetVideoFn: (resetFunction) =>
    set(() => ({ resetVideoFn: resetFunction })),
}));
