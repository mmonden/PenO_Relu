import AnnotationBar from "../../components/annotationbar";
import {
  getAnnotations,
  writeAnnotation,
  getFile,
  getPatients,
} from "../../lib/annotations";
import { GetServerSideProps } from "next";
import PopUp from "../../components/PopUp";
import Sidebar from "../../components/layout/Sidebar";
import Stlviewer from "../../components/stlviewer";
import {controls, scene, theline} from "../../components/stlviewer";
import {removecolor} from "../../components/stlviewer";
import { useRouter } from "next/router";
import { Navigation } from "../../components/NavBarPatient";
import { getSession } from "next-auth/react";
import { IFile } from "../../types";
import { getFiles } from "../../lib/annotations";
import { ObjectID } from "mongodb";
import { Sprite } from "three";

export default function Home({ file, files, patients }) {
  const resetSTL = () => {
    if (file.selected) {removecolor(file)}
    file.selected = null; 
    scene.children = scene.children.filter(
        (child) => !(child instanceof Sprite)
      );
      if (theline) {
        scene.remove(theline);
      }
      controls.reset( true )
  };
  
  var states_dict = {}

  return (
    <div className="flex relative w-screen h-screen">
      <Stlviewer file={file} />
      <div className="absolute w-full">
        <Navigation files_input={files} patients_input={patients} file={file} />
      </div>
      <div className="absolute">
        <button onClick={() => resetSTL()}>reset</button>
      </div>
      <div className="absolute top-12">
        <AnnotationBar file={file} />
      </div>
      <div
        className="absolute right-0 top-12"
        style={{ height: "calc(100vh - 48px)" }}
      >
        <Sidebar states={states_dict}/>
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
