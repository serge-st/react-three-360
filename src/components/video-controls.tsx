import { FC, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useVideoPlayerStore } from "@/app/store";
import { Slider } from "./ui/slider";
import { getDurationFromString } from "@/lib/utils";

export const VideoContorls: FC = () => {
  const {
    isPlaying,
    setIsPlaying,
    resetVideoFn,
    progress,
    setProgress,
    duration,
    videoTime,
    defects,
  } = useVideoPlayerStore();

  const togglePlay = useCallback(() => {
    isPlaying ? setIsPlaying(false) : setIsPlaying(true);
  }, [isPlaying, setIsPlaying]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
    },
    [togglePlay]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const resetVideo = () => {
    if (!resetVideoFn) return;
    setIsPlaying(false);
    resetVideoFn();
  };

  const changeProgress = (value: number[]) => {
    const [newValue] = value;
    setProgress(newValue);
  };

  const jumpToDefect = (time: string) => {
    changeProgress([getDurationFromString(time)]);
  };

  const defectArray = defects ? Array.from(defects.values()) : undefined;

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
      <div className="flex flex-col gap-4 items-center">
        <h2>Defects</h2>
        <div className="flex gap-4 w-[800px] overflow-auto p-2">
          {defectArray &&
            defectArray.map((defect) => (
              <Button
                key={defect.video_time}
                variant="outline"
                className="text-xs"
                onClick={() => jumpToDefect(defect.video_time)}
              >
                {defect.video_time}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};
