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

    console.log("videoElRef", texture.source);

    const handleEnded = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      if (!videoElRef.current) return;
      console.log("timeupdate", videoElRef.current.currentTime);

      setProgress(videoElRef.current.currentTime);
    };

    const resetVideo = () => {
      if (!videoElRef.current) return;

      videoElRef.current.pause();
      videoElRef.current.currentTime = 0;
    };

    if (videoElRef.current) {
      videoElRef.current.addEventListener("ended", handleEnded);
      videoElRef.current.addEventListener("timeupdate", handleTimeUpdate);
      setResetVideoFn(resetVideo);
      setDuration(videoElRef.current.duration);
    }

    return () => {
      if (videoElRef.current) {
        videoElRef.current.removeEventListener("ended", handleEnded);
        videoElRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [texture, setIsPlaying, setProgress, setResetVideoFn, setDuration]);

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
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 128, 128]} />
      <Suspense fallback={<h1>Loading...</h1>}>
        <meshBasicMaterial map={texture} side={BackSide} />
      </Suspense>
      <OrbitControls enableZoom={false} reverseOrbit={true} />
    </mesh>
  );
};
