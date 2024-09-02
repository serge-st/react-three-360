"use client";

import { FC, Suspense, useEffect, useRef } from "react";
import { OrbitControls, useVideoTexture } from "@react-three/drei";
import { BackSide } from "three";
import { usePlayerStore } from "@/app/store";

interface VideoMaterialProps {}

export const VideoMaterial: FC<VideoMaterialProps> = () => {
  const {
    isPlaying,
    setResetVideoFn,
    setIsPlaying,
    setProgress,
    progress,
    setDuration,
  } = usePlayerStore();

  const texture = useVideoTexture("/vid.mp4", {
    unsuspend: "canplay",
    muted: true,
    start: false,
    loop: false,
  });

  const videoElRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!texture?.source?.data) return;
    videoElRef.current = texture.source.data;
  }, [texture]);

  useEffect(() => {
    if (!videoElRef.current) return;

    const resetVideo = () => {
      if (!videoElRef.current) return;

      videoElRef.current.pause();
      videoElRef.current.currentTime = 0;
    };

    setResetVideoFn(resetVideo);
    setDuration(videoElRef.current.duration);
  }, [setResetVideoFn, setDuration]);

  useEffect(() => {
    if (!videoElRef.current) return;

    const handleEnded = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      if (!videoElRef.current) return;
      setProgress(videoElRef.current.currentTime);
    };

    videoElRef.current.addEventListener("ended", handleEnded);
    videoElRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      if (videoElRef.current) {
        videoElRef.current.removeEventListener("ended", handleEnded);
        videoElRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [setIsPlaying, setProgress]);

  useEffect(() => {
    if (!videoElRef.current) return;

    if (isPlaying) {
      videoElRef.current.play();
    } else {
      videoElRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!videoElRef.current) return;

    const timeDelta = Math.abs(progress - videoElRef.current.currentTime);
    if (timeDelta < 1) return;

    videoElRef.current.currentTime = progress;
  }, [progress]);

  return (
    <group>
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[50, 128, 128]} />
        <Suspense fallback={null}>
          <meshBasicMaterial map={texture} side={BackSide} />
        </Suspense>
        <OrbitControls enableZoom={false} reverseOrbit={true} />
      </mesh>
    </group>
  );
};
