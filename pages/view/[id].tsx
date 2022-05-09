import AnnotationBar from "../../components/annotationbar";
import { getAnnotations, getFile, getPatients } from "../../lib/annotations";
import { GetServerSideProps } from "next";
import PopUp from "../../components/PopUp";
import Sidebar from "../../components/layout/Sidebar";
import {
  controls,
  scene,
  theline,
  Skull,
  Stlviewer,
} from "../../components/stlviewer";
import { removecolor } from "../../components/stlviewer";
import { Navigation } from "../../components/NavBarPatient";
import { getSession } from "next-auth/react";
import { getFiles } from "../../lib/annotations";
import THREE, { Sprite } from "three";
import { useState } from "react";

export default function Home({ file, files, patients }) {
  const [skullSelect, setSkullSelect] = useState(false);
  const [skullLoaded, setSkullLoaded] = useState(false);
  const [annoClick, setAnnoClick] = useState(false);
  const [selectedTooth, setSelectedTooth] = useState("");
  const resetSTL = () => {
    if (file.selected) {
      removecolor(file);
    }
    file.selected = null;
    scene.children = scene.children.filter(
      (child) => !(child instanceof Sprite)
    );
    if (theline) {
      scene.remove(theline);
      if (scene.getObjectByProperty("name", "sphere") != undefined) {
        const object = scene.getObjectByProperty("name", "sphere");
        object.geometry.dispose();
        object.material.dispose();
        scene.remove(object);
      }
    }
    controls.reset(true);
  };
  const onSwipe = () => {
    controls.moveTo(50, 50, 100, true);
  };

  var states_dict = { TOOTH_11: onSwipe };
  return (
    <div className="flex relative w-screen h-screen">
      <Stlviewer file={file} setSkullLoaded={setSkullLoaded} />
      <div className="absolute w-full">
        <Navigation
          files_input={files}
          patients_input={patients}
          file={file}
          resetSTL={resetSTL}
        />
      </div>
      ({skullSelect ? <Skull select={true} /> : <Skull select={false} />})
      <div className="absolute top-12">
        <AnnotationBar
          file={file}
          setAnnoClick={setAnnoClick}
          annoClick={annoClick}
          setSelectedTooth={setSelectedTooth}
        />
      </div>
      <div
        className="absolute right-0 top-12"
        style={{ height: "calc(100vh - 48px)" }}
      >
        <Sidebar
          states={states_dict}
          setSkullSelect={setSkullSelect}
          skullSelect={skullSelect}
          skullLoaded={skullLoaded}
          file={file}
          selectedTooth={selectedTooth}
        />
        <div className="absolute right-0 bottom-0 flex flex-row">
          <PopUp file={file} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const files = await getFiles();
  const { id } = ctx.query;
  const file_id = String(id);

  const file = await getFile(file_id);
  file.cards = await getAnnotations(file);

  const patients = await getPatients();

  return {
    props: { file, files, patients }, // will be passed to the page component as props
  };
};
