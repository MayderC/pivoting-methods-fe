"use client";
import { Camera } from "@/3D/Init/Camera";
import { Render } from "@/3D/Init/Render";
import { Scene } from "@/3D/Init/Scene";
import { ScreensAbstractFactory } from "@/3D/abstract-positions/objects-position-animation/factories/ScreensAbstractFactory";
import { PRODUCT } from "@/3D/abstract-positions/objects-position-animation/products/types";
import { Loader } from "@/3D/tools/Loader";
import { useEffect } from "react";
import { Vector3 } from "three";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props {
  scene: Scene;
  render?: Render;
  camera?: Camera;
}

export const Calculator = ({ scene, render, camera }: Props) => {
  useEffect(() => {
    if (!render || !camera) return;
    (async () => {
      const mesh = await new Loader().getScene("/calc.glb");
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      mesh.setRotationFromAxisAngle(new Vector3(0, 0.5, 0), 0.5);
      scene.add(mesh);
      camera.lookAt(mesh.position);
      console.log("init calculator");
      render?.addFunctionToExecute(() => {
        ScreensAbstractFactory.createFactory(mesh, PRODUCT.CALCULATOR);
      }, "setup-calculator");

      gsap.registerPlugin(ScrollTrigger);
      const calcObj = {
        x: mesh.position.x,
        y: mesh.position.y,
        z: mesh.position.z,
        rotation: {
          x: mesh.rotation.x,
          y: mesh.rotation.y,
          z: mesh.rotation.z,
        },
      };
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

      tl.to(calcObj.rotation, {
        duration: 1,
        y: tau * 2,
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

      tl2.to(calcObj.rotation, {
        duration: 1,
        y: tau * 2,
        ease: " power2.inOut ",
      });

      render?.addFunctionToExecute(() => {
        mesh.rotation.y = calcObj.rotation.y;
        //mesh.position.x = calcObj.x;
      }, "calculator-movement");
    })();
  }, [render, scene, camera]);

  return <></>;
};
