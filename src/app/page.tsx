"use client";
import { Camera } from "@/3D/Init/Camera";
import { Scene } from "@/3D/Init/Scene";
import { Calculator } from "@/components/calculator/Calculator";
import { RenderComponent as Render } from "@/components/render/RenderComponent";
import { useEffect, useState } from "react";
import { AmbientLight, SpotLight } from "three";

export default function Home() {
  const [scene, setScene] = useState<Scene>(new Scene());
  const [camera, setCamera] = useState<Camera>();

  useEffect(() => {
    setCamera(
      new Camera({
        aspect: window.innerWidth / window.innerHeight,
        fov: 50,
        near: 0.1,
        far: 1000,
      })
    );

    const light = new AmbientLight(0xffffff, 1);
    scene.add(light);
  }, []);

  return (
    <main className="flex min-h-screen">
      <Render scene={scene} camera={camera} canvasId="#three" key="three">
        <canvas id="three">
          <Calculator scene={scene} />
        </canvas>
      </Render>
    </main>
  );
}
