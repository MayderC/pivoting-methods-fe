import { Object3D } from "three";
import { IProduct } from "./IProduct";
import { SCREEN } from "../factories/types";
export class Calculator implements IProduct {
  private object: Object3D;
  private screen: SCREEN;

  constructor(object: Object3D, screen: SCREEN) {
    this.screen = screen;
    this.object = object;
    this.run();
  }

  run(): void {
    this.setConfiguration(this.screen, this.object);
  }

  private setConfiguration(screen: SCREEN, object: Object3D) {
    if (screen === SCREEN.MOBILE) {
      object.scale.set(1, 1, 1);
      object.position.set(0, -1.5, 0);
    }

    if (screen === SCREEN.TABLET) {
      object.scale.set(1, 1, 1);
      object.position.set(0, -1.5, 0);
    }

    if (screen === SCREEN.DESKTOP) {
      object.position.set(-3, -0.5, 0);
      object.scale.set(1, 1, 1);
    }
  }
}
