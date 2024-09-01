"use client";

import { VideoContorls } from "@/components/video-controls";
import { VideoRenderer } from "@/components/video-renderer";

export default function Page() {
  const width = 640;
  const height = 480;

  return (
    <main className="min-h-screen p-24 flex flex-col justify-evenly items-center">
      <VideoRenderer width={width} height={height} />

      <VideoContorls />
    </main>
  );
}
