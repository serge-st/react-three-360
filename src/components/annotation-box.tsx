import { FC, ReactNode } from "react";
import { Edges, Text } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";

interface AnnotationBoxProps {
  position: Vector3;
  width: number;
  height: number;
  children?: ReactNode;
  fontSize?: number;
}

export const AnnotationBox: FC<AnnotationBoxProps> = ({
  position,
  width,
  height,
  children,
  fontSize = 1,
}) => {
  const annotationPostion: Vector3 = [
    0,
    height / 2 + fontSize,
    fontSize - width / 2,
  ];

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0, height, width]} />
        <meshBasicMaterial visible={false} />
        <Edges linewidth={2} color="red" />
      </mesh>
      {children && (
        <Text
          scale={[-1, 1, 1]}
          fontSize={fontSize}
          fontWeight={"bold"}
          position={annotationPostion}
          color="red"
          rotation={[0, Math.PI / 2, 0]}
        >
          {children}
        </Text>
      )}
    </group>
  );
};
