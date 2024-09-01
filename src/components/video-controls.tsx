import { FC } from "react";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/app/store";

export const VideoContorls: FC = () => {
  const { isPlaying, setIsPlaying, resetVideoFn } = usePlayerStore();

  const resetVideo = () => {
    if (!resetVideoFn) return;
    setIsPlaying(false);
    resetVideoFn();
  };

  const togglePlay = () => {
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);
  };

  return (
    <>
      <div className="flex gap-4">
        <Button onClick={resetVideo}>Back To Start</Button>
        <Button onClick={togglePlay}>{isPlaying ? "Stop" : "Play"}</Button>
      </div>
    </>
  );
};
