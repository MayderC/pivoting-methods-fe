import { PerspectiveCamera } from "three";

interface CameraBuildParams {
  fov: number;
  aspect: number;
  near: number;
  far: number;
}

export class Camera extends PerspectiveCamera {
  constructor(opts: CameraBuildParams) {
    super(opts.fov, opts.aspect, opts.near, opts.far);
    this.init();
    this.updateSize();
  }

  public init(): void {
    this.position.set(0, 0, 5);
  }

  public updateSize(): void {
    window.addEventListener("resize", () => {
      this.aspect = window.innerWidth / window.innerHeight;
      this.updateProjectionMatrix();
    });
  }
}
