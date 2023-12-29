import { WebGL1Renderer, WebGLRenderer } from "three";
import { Camera } from "./Camera";
import { Scene } from "./Scene";

interface RenderBuildParams {
  camera: Camera;
  scene: Scene;
  canvasId: string;
}

export class Render extends WebGLRenderer {
  private camera: Camera;
  private scene: Scene;

  constructor(opts: RenderBuildParams) {
    super({
      antialias: true,
      canvas: document.querySelector(opts.canvasId)! as HTMLCanvasElement,
    });
    this.camera = opts.camera;
    this.scene = opts.scene;
    this.init();
    this.updateSize();
    this.loop();
  }

  public init(): void {
    this.setSize(window.innerWidth, window.innerHeight);
  }

  private updateSize(): void {
    window.addEventListener("resize", () => {
      this.setSize(window.innerWidth, window.innerHeight);
    });
  }

  public loop(): void {
    console.log("loop");
    this.render(this.scene, this.camera);
    window.requestAnimationFrame(this.loop.bind(this));
  }
}
