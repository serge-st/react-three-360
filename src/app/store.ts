import { create } from "zustand";
import { getTimeString } from "@/lib/utils";
import { Defect } from "@/lib/types";

type VideoPlayerStore = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  resetVideoFn: undefined | (() => void);
  setResetVideoFn: (resetFunction: () => void) => void;
  progress: number;
  videoTime: string;
  setProgress: (progress: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  videoUrl: string;
  setVidoUrl: (url: string) => void;
  defects: Map<string, Defect> | null;
  setDefects: (defects: Map<string, Defect>) => void;
};

export const useVideoPlayerStore = create<VideoPlayerStore>((set) => ({
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
  videoUrl: "",
  setVidoUrl: (url) => set(() => ({ videoUrl: url })),
  defects: null,
  setDefects: (defects) => set(() => ({ defects })),
}));
