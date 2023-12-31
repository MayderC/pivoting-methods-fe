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
  private functionsToExecute: Map<string, Function> = new Map();

  constructor(opts: RenderBuildParams) {
    super({
      antialias: true,
      canvas: document.querySelector(opts.canvasId)! as HTMLCanvasElement,
    });
    this.camera = opts.camera;
    this.scene = opts.scene;
    //set background to the scene

    this.setClearColor("#222122");

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

  private executeFunctions(): void {
    this.functionsToExecute.forEach((func) => func());
  }

  public addFunctionToExecute(func: Function, name: string): void {
    this.functionsToExecute.set(name, func);
  }

  public loop(): void {
    window.requestAnimationFrame(this.loop.bind(this));
    this.executeFunctions();
    this.render(this.scene, this.camera);
  }
}
