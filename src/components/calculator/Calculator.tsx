"use client";
import { Scene } from "@/3D/Init/Scene";
import { Loader } from "@/3D/tools/Loader";
import { useEffect } from "react";
import { Vector3 } from "three";

interface Props {
  scene: Scene;
}

export const Calculator = ({ scene }: Props) => {
  useEffect(() => {
    (async () => {
      const mesh = await new Loader().getScene("/calc.glb");
      mesh.position.set(-3, -0.5, 0);
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      mesh.setRotationFromAxisAngle(new Vector3(0, 1, 0), 0.5);
      scene.add(mesh);
    })();
  }, []);

  return <></>;
};
