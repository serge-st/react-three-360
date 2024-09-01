"use client";

import { FC, Suspense, useCallback, useEffect, useRef } from "react";
import { OrbitControls, useVideoTexture } from "@react-three/drei";
import { BackSide } from "three";
import { usePlayerStore } from "@/app/store";

interface VideoMaterialProps {}

export const VideoMaterial: FC<VideoMaterialProps> = () => {
  const { isPlaying, setResetVideoFn, setIsPlaying } = usePlayerStore();

  const texture = useVideoTexture("/trimmed.mp4", {
    unsuspend: "canplay",
    muted: true,
    start: false,
    loop: false,
  });

  const videoEl = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!texture?.source?.data) return;
    videoEl.current = texture.source.data;

    const handleEnded = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      if (!videoEl.current) return;
      console.log("timeupdate", videoEl.current.currentTime);
    };

    const resetVideo = () => {
      if (!videoEl.current) return;

      videoEl.current.pause();
      videoEl.current.currentTime = 0;
    };

    if (videoEl.current) {
      videoEl.current.addEventListener("ended", handleEnded);
      videoEl.current.addEventListener("timeupdate", handleTimeUpdate);
      setResetVideoFn(resetVideo);
    }

    return () => {
      if (videoEl.current) {
        videoEl.current.removeEventListener("ended", handleEnded);
        videoEl.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [texture, setIsPlaying]);

  useEffect(() => {
    if (!videoEl.current) return;

    if (isPlaying) {
      videoEl.current.play();
    } else {
      videoEl.current.pause();
    }
  }, [isPlaying]);

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
