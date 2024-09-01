"use client";

import { FC, Suspense } from "react";
import { OrbitControls, useVideoTexture } from "@react-three/drei";
import { BackSide } from "three";

interface VideoMaterialProps {}

export const VideoMaterial: FC<VideoMaterialProps> = () => {
  const texture = useVideoTexture("/trimmed.mp4", {
    muted: true,
    loop: true,
    start: true,
  });

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 128, 128]} />
      <Suspense fallback={<h1>Loading...</h1>}>
        <meshBasicMaterial map={texture} side={BackSide} />
      </Suspense>
      <OrbitControls enableZoom={false} reverseOrbit={true} />
    </mesh>
  );
};
