import { FC, useCallback, useEffect, useRef } from "react";
import { BackSide, CanvasTexture } from "three";
import { useVideoPlayerStore } from "@/app/store";

interface OverlayProps {
  width?: number;
  height?: number;
}

export const Overlay: FC<OverlayProps> = ({ width = 5376, height = 2688 }) => {
  const { videoTime, defects } = useVideoPlayerStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>();
  const textureRef = useRef<CanvasTexture | null>(null);

  const clearCanvas = useCallback(() => {
    if (!context.current) return;
    context.current.clearRect(0, 0, width, height);
  }, [width, height]);

  const updateTexture = useCallback(() => {
    if (!textureRef.current) return;
    textureRef.current.needsUpdate = true;
  }, [textureRef]);

  useEffect(() => {
    if (canvasRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvasRef.current = canvas;
    context.current = canvas.getContext("2d");
    clearCanvas();
  }, [width, height, clearCanvas]);

  const drawBoundingBox = useCallback(
    (label: string, x1: number, y1: number, x2: number, y2: number) => {
      if (!context.current) return;
      context.current.strokeStyle = "red";
      context.current.fillStyle = "red";
      context.current.lineWidth = 4;
      const left = x1;
      const top = y1;
      const right = x2 - x1;
      const bottom = y2 - y1;
      context.current.strokeRect(left, top, right, bottom);
      context.current.font = "60px Arial";
      context.current.fillText(label, left, top - 15);
    },
    [context]
  );

  useEffect(() => {
    if (!canvasRef.current || !context.current) return;

    clearCanvas();
    updateTexture();

    if (!defects) return;
    const defect = defects.get(videoTime);
    if (!defect || defect.annotations.length === 0) return;

    defect.annotations.forEach((annotation) => {
      const { category_name, bbox } = annotation;
      drawBoundingBox(category_name, ...bbox);
    });

    updateTexture();
  }, [clearCanvas, videoTime, defects, drawBoundingBox, updateTexture]);

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 128, 128]} />
      <meshBasicMaterial transparent side={BackSide}>
        {canvasRef.current && (
          <canvasTexture
            ref={textureRef}
            attach="map"
            image={canvasRef.current}
          ></canvasTexture>
        )}
      </meshBasicMaterial>
    </mesh>
  );
};
