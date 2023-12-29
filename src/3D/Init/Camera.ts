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
  }

  public init(): void {
    this.position.set(0, 0, 5);
  }
}
