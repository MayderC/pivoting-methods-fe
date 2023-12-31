"use client";
import { Camera } from "@/3D/Init/Camera";
import { Scene } from "@/3D/Init/Scene";
import { Render } from "@/3D/Init/Render";
import { Calculator } from "@/components/calculator/Calculator";
import { useEffect, useState } from "react";
import { AmbientLight, SpotLight } from "three";
import { ScreensAbstractFactory } from "@/3D/abstract-positions/objects-position-animation/factories/ScreensAbstractFactory";
import { PRODUCT } from "@/3D/abstract-positions/objects-position-animation/products/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [scene, setScene] = useState<Scene>(new Scene());
  const [camera, setCamera] = useState<Camera>();
  const [render, setRender] = useState<Render>();

  useEffect(() => {
    const camera = new Camera({
      aspect: window.innerWidth / window.innerHeight,
      fov: 50,
      near: 0.1,
      far: 1000,
    });
    setCamera(camera);
    const render = new Render({ canvasId: "#three", scene, camera });
    setRender(render);

    render.addFunctionToExecute(() => {
      ScreensAbstractFactory.createFactory(camera, PRODUCT.CAMERA);
    }, "camera-movement");

    const spotLight = new SpotLight(0xcccccc, 1);
    spotLight.position.set(-3.33, 0.8, 1);
    spotLight.castShadow = true;
    spotLight.rotation.y = -Math.PI / 2;
    scene.add(spotLight);

    const camPos = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
      rotation: {
        x: camera.rotation.x,
        y: camera.rotation.y,
        z: camera.rotation.z,
      },
    };

    gsap.registerPlugin(ScrollTrigger);
    let tau = Math.PI * 2;

    const tl = gsap.timeline({
      scrollTrigger: {
        scroller: "#container",
        trigger: "#section2",
        start: "top bottom",
        end: "bottom bottom",
        markers: true,
        scrub: true,
      },
    });

    tl.to(camPos, {
      duration: 1,
      x: -(tau * 0.95),
      ease: " power2.inOut ",
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        scroller: "#container",
        trigger: "#section3",
        start: "top bottom",
        end: "bottom bottom",
        markers: true,
        scrub: true,
      },
    });

    tl2.to(camPos, {
      duration: 1,
      x: -(tau * 0.95),
      ease: " power2.inOut ",
    });

    render.addFunctionToExecute(() => {
      camera.position.x = camPos.x;
      //camera.rotation.y = camPos.rotation.y;
    }, "camera-movement");

    const light = new AmbientLight(0xffffff, 1);
    scene.add(light);
  }, []);

  return (
    <main
      id="container"
      className="min-h-screen max-h-screen h-screen relative overflow-y-scroll"
    >
      <div className="-z-10 overflow-hidden h-screen fixed">
        <canvas id="three">
          <Calculator scene={scene} render={render} camera={camera} />
        </canvas>
      </div>
      <section
        id="section1"
        className="min-h-screen h-screen z-100 flex flex-wrap py-28  justify-end items-start "
      >
        <div className="w-1/2 flex justify-center h-[60vh] items-start py-14 -sm:py-0 -lg:w-full">
          <h1 className="font-bold text-4xl gradient-text whitespace-nowrap -sm:text-3xl">
            Metodos Numericos
          </h1>
        </div>
      </section>
      <section id="section2" className="min-h-screen h-screen z-100">
        <h1>Name</h1>
      </section>
      <section id="section3" className="min-h-screen h-screen z-100">
        <h1>Name</h1>
      </section>
    </main>
  );
}
