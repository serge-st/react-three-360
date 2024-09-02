import { FC, useCallback, useEffect } from "react";
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
    videoTime,
  } = usePlayerStore();

  const resetVideo = () => {
    if (!resetVideoFn) return;
    setIsPlaying(false);
    resetVideoFn();
  };

  const togglePlay = useCallback(() => {
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);
  }, [isPlaying, setIsPlaying]);

  const changeProgress = (value: number[]) => {
    const [newValue] = value;
    setProgress(newValue);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      togglePlay();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [togglePlay]);

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <div className="flex gap-4">
        <Slider
          value={[progress]}
          onValueChange={(value) => changeProgress(value)}
          max={duration}
          step={1}
          className="w-[400px] cursor-pointer"
        />
        <p>{videoTime}</p>
      </div>
      <div className="flex gap-4">
        <Button onClick={resetVideo}>Back To Start</Button>
        <Button onClick={togglePlay} className="w-16">
          {isPlaying ? "Stop" : "Play"}
        </Button>
      </div>
    </div>
  );
};
