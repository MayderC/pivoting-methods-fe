import { Object3D } from "three";
import { PRODUCT } from "../products/types";
import { SCREEN } from "./types";
import { Calculator } from "../products/Calculator";
import { Camera } from "@/3D/Init/Camera";

export class ProductFactory {
  static setConfiguration(
    object: Object3D | Camera,
    screen: SCREEN,
    product: PRODUCT
  ) {
    if (product === PRODUCT.CALCULATOR && object instanceof Object3D) {
      return new Calculator(object, screen);
    }
    if (product === PRODUCT.CAMERA && object instanceof Camera) {
      return Camera.updatePosition(object);
    }
  }
}
