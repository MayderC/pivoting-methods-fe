"use client";

import { Camera } from "@/3D/Init/Camera";
import { Render } from "@/3D/Init/Render";
import { Scene } from "@/3D/Init/Scene";
import React from "react";
import { useEffect, useState } from "react";

interface RenderProps {
  scene: Scene;
  camera: Camera | undefined;
  canvasId: string;
  children: React.ReactNode;
  className?: string;
}

export const RenderComponent = ({
  children,
  camera,
  scene,
  canvasId,
  className,
}: RenderProps) => {
  const [render, setRender] = useState<Render>();

  useEffect(() => {
    if (!camera) return;
  }, [camera, scene, canvasId]);

  useEffect(() => {}, []);

  return (
    <div className={className}>
      {React.Children.map(children, (child): React.ReactNode => {
        console.log(child);
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { ...child.props, render });
        }
        return child;
      })}
    </div>
  );
};
