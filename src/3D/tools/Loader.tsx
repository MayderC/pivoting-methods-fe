import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

export class Loader extends GLTFLoader {
  constructor() {
    super();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
    );
    dracoLoader.setDecoderConfig({ type: "js" });
    this.setDRACOLoader(dracoLoader);
  }

  async getScene(url: string) {
    const gltf = await this.loadAsync(url);
    return gltf.scene;
  }
}
