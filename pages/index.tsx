import AnnotationBar from "../components/annotationbar";
import { getAnnotations, writeAnnotation, getFiles } from "../lib/annotations";
import { GetServerSideProps } from "next";
import PopUp from "../components/PopUp";
import Sidebar from "../components/layout/Sidebar";

import Stlviewer from "../components/stlviewer";

export default function Home({ annotations, files }) {
  return (
    <div
      id="main_container"
      className="min-h-screen min-w-screen flex flex-row "
    >
      <div className="absolute left-0">
        <AnnotationBar cardsInput={annotations} />
      </div>
      <Stlviewer />
      <div className="absolute right-0 flex flex-row">
        <PopUp file={files[0]} />
        <Sidebar />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // TODO: Now just loads random file
  const files = await getFiles();
  const annotations = await getAnnotations(files[0]);

  return {
    props: { annotations, files }, // will be passed to the page component as props
  };
};
