import { create } from "zustand";

type PlayerStore = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  resetVideoFn: undefined | (() => void);
  setResetVideoFn: (resetFunction: () => void) => void;
  progress: number;
  setProgress: (progress: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
  resetVideoFn: undefined,
  setResetVideoFn: (resetFunction) =>
    set(() => ({ resetVideoFn: resetFunction })),
  progress: 0,
  setProgress: (progress) => set(() => ({ progress })),
  duration: 0,
  setDuration: (duration) => set(() => ({ duration })),
}));
