"use client";

import { UploadScreen } from "@/components/upload-screen";
import { VideoContorls } from "@/components/video-controls";
import { VideoRenderer } from "@/components/video-renderer";
import { useVideoPlayerStore } from "./store";

export default function Page() {
  const width = 896;
  const height = 504;
  const { videoUrl, defects } = useVideoPlayerStore();

  const filesReady = videoUrl && defects;

  return (
    <main className="min-h-screen p-20 flex flex-col justify-evenly items-center">
      {filesReady ? (
        <>
          <VideoRenderer width={width} height={height} />
          <VideoContorls />
        </>
      ) : (
        <UploadScreen />
      )}
    </main>
  );
}
