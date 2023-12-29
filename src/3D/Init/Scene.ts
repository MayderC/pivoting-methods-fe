import { Scene as ThreeScene } from "three";

export class Scene extends ThreeScene {
  constructor() {
    super();
    this.init();
  }

  public init(): void {}
}
