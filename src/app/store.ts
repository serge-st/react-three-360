import { create } from "zustand";
import { getTimeString } from "@/lib/utils";

type PlayerStore = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  resetVideoFn: undefined | (() => void);
  setResetVideoFn: (resetFunction: () => void) => void;
  progress: number;
  videoTime: string;
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
  videoTime: "00:00",
  setProgress: (progress) =>
    set(() => ({ progress, videoTime: getTimeString(progress) })),
  duration: 0,
  setDuration: (duration) => set(() => ({ duration })),
}));
