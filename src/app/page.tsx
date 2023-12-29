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
    <main className="min-h-screen max-h-screen h-screen relative overflow-y-scroll">
      <Render
        className="-z-10 overflow-hidden h-screen fixed"
        scene={scene}
        camera={camera}
        canvasId="#three"
        key="three"
      >
        <canvas id="three">
          <Calculator scene={scene} />
        </canvas>
      </Render>
      <section className="min-h-screen h-screen z-100 flex flex-wrap py-28  justify-center items-start">
        <div className="w-1/2 flex justify-center items-center h-screen px-60 -lg:w-full -lg:h-[65vh]"></div>
        <div className="w-1/2 flex justify-center items-start py-14 h-screen ">
          <h1 className="font-bold text-4xl gradient-text whitespace-nowrap -sm:text-3xl">
            Metodos Numericos
          </h1>
        </div>
      </section>
      <section className="min-h-screen h-screen z-100">
        <h1>Mayder</h1>
      </section>
      <section className="min-h-screen h-screen z-100">
        <h1>Mayder</h1>
      </section>
    </main>
  );
}
