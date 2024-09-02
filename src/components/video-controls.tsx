import { FC } from "react";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/app/store";
import { Slider } from "./ui/slider";

export const VideoContorls: FC = () => {
  const {
    isPlaying,
    setIsPlaying,
    resetVideoFn,
    progress,
    setProgress,
    duration,
  } = usePlayerStore();

  const resetVideo = () => {
    if (!resetVideoFn) return;
    setIsPlaying(false);
    resetVideoFn();
  };

  const togglePlay = () => {
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);
  };

  const changeProgress = (value: number[]) => {
    const [newValue] = value;
    setProgress(newValue);
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <Slider
        value={[progress]}
        onValueChange={(value) => changeProgress(value)}
        max={duration}
        step={1}
        className="w-[400px] cursor-pointer"
      />
      <div className="flex gap-4">
        <Button onClick={resetVideo}>Back To Start</Button>
        <Button onClick={togglePlay}>{isPlaying ? "Stop" : "Play"}</Button>
      </div>
    </div>
  );
};
