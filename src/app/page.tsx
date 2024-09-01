"use client";

import { Canvas } from "@react-three/fiber";
import { VideoMaterial } from "./video-material";

export default function Page() {
  const width = 640;
  const height = 480;

  return (
    <main className="min-h-screen p-24 flex flex-col justify-center items-center">
      <div style={{ width, height }}>
        <Canvas
          className="cursor-grab active:cursor-grabbing"
          camera={{
            fov: 74,
            near: 1,
            far: 100,
            aspect: width / height,
            position: [0, 0, 1],
          }}
        >
          <VideoMaterial />
        </Canvas>
      </div>
    </main>
  );
}
