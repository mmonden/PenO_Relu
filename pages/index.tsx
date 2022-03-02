import AnnotationBar from "../components/annotationbar";
import { getAnnotations, getFiles } from "../lib/annotations";
import { GetServerSideProps } from "next";
import Stlviewer from "../components/stlviewer";
import PopUp from "../components/PopUp";
import Script from "next/script";

export default function Home({ annotations }) {
  return (
    <div id="main_container" className="absolute inset-0 flex flew-row">
      <AnnotationBar cardsInput={annotations} />
      <Stlviewer />
      <PopUp />
    </div>

    // <div className="min-h-screen min-w-screen">
    //   <AnnotationBar cardsInput={annotations} />
    //   <PopUp />
    //   <Stlviewer />
    // </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // TODO: Now just loads random file
  const files = await getFiles();
  const annotations = await getAnnotations(files[0]);

  return {
    props: { annotations }, // will be passed to the page component as props
  };
};
