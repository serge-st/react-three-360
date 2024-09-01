import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import { VideoMaterial } from "./video-material";

interface VideoRendererProps {
  width: number;
  height: number;
}

export const VideoRenderer: FC<VideoRendererProps> = ({ width, height }) => {
  return (
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
  );
};
