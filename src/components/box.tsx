import { FC } from "react";

interface BoxProps {}

export const Box: FC<BoxProps> = (props) => {
  return (
    <mesh {...props}>
      <planeGeometry args={[30, 30]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
};
