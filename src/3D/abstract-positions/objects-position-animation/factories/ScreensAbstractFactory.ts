import { Object3D } from "three";
import { ProductFactory } from "./ProductsFactory";
import { PRODUCT } from "../products/types";
import { SCREEN } from "./types";
import { Camera } from "@/3D/Init/Camera";

export class ScreensAbstractFactory {
  static createFactory(object: Object3D | Camera, product: PRODUCT) {
    const screen = window.innerWidth;

    if (screen < 700) {
      return ProductFactory.setConfiguration(object, SCREEN.MOBILE, product);
    }
    if (screen < 900) {
      return ProductFactory.setConfiguration(object, SCREEN.TABLET, product);
    }
    if (screen > 900) {
      return ProductFactory.setConfiguration(object, SCREEN.DESKTOP, product);
    }
    return ProductFactory.setConfiguration(object, SCREEN.DESKTOP, product);
  }
}
