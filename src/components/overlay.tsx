import { FC, Suspense, useEffect, useRef } from "react";
import { BackSide, CanvasTexture } from "three";
import { Box } from "./box";

interface OverlayProps {
  width?: number;
  height?: number;
}

export const Overlay: FC<OverlayProps> = ({ width = 5376, height = 2688 }) => {
  const canvasRef = useRef(document.createElement("canvas"));
  const context = useRef(canvasRef.current.getContext("2d"));
  const textureRef = useRef<CanvasTexture | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !context.current) return;

    canvasRef.current.width = width;
    canvasRef.current.height = height;

    if (!context) return;
    context.current.clearRect(0, 0, width, height);
    context.current.fillStyle = "rgba(255, 0, 0, 0.5)";

    const [x1, y1, x2, y2] = [1249, 1767, 2547, 2192];
    // const [x1, y1, x2, y2] = [0, 0, 5376, 2688];
    const bbWidth = x2 - x1;
    const bbHeight = y2 - y1;
    context.current.fillRect(x1, y1, bbWidth, bbHeight);
  }, [height, width]);

  return (
    <Suspense fallback={null}>
      <mesh>
        <sphereGeometry args={[50, 128, 128]} />
        <meshBasicMaterial opacity={0.5} transparent side={BackSide}>
          <canvasTexture
            ref={textureRef}
            attach="map"
            image={canvasRef.current}
          ></canvasTexture>
        </meshBasicMaterial>
      </mesh>
    </Suspense>
  );
};
