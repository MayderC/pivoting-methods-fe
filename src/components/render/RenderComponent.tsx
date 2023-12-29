"use client";

import { Camera } from "@/3D/Init/Camera";
import { Render } from "@/3D/Init/Render";
import { Scene } from "@/3D/Init/Scene";
import { useEffect, useState } from "react";
import { SpotLight } from "three";

interface RenderProps {
  scene: Scene;
  camera: Camera | undefined;
  canvasId: string;
  children: React.ReactNode;
}

export const RenderComponent = ({
  children,
  camera,
  scene,
  canvasId,
}: RenderProps) => {
  const [render, setRender] = useState<Render>();

  useEffect(() => {
    if (!camera) return;
    setRender(new Render({ canvasId, scene, camera }));
    const spotLight = new SpotLight(0xcccccc, 1);
    spotLight.position.set(-3.33, 0.8, 1);
    spotLight.castShadow = true;
    scene.add(spotLight);
  }, [camera, scene, canvasId]);

  useEffect(() => {}, []);

  return <div>{children}</div>;
};
