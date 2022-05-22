import {
  DefaultXRControllers,
  VRCanvas,
  Interactive,
  useXR,
  useXREvent,
} from "@react-three/xr";
import {
  controls,
  scene,
  theline,
  Skull,
  Stlviewer,
  camera,
  renderer,
  render,
} from "../../components/stlviewer";

export default function AR() {
  return (
    <VRCanvas>
      <DefaultXRControllers />
    </VRCanvas>
  );
}
