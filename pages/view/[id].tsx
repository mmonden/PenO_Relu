import AnnotationBar from "../../components/annotationbar";
import {
  getAnnotations,
  writeAnnotation,
  getFile,
} from "../../lib/annotations";
import { GetServerSideProps } from "next";
import PopUp from "../../components/PopUp";
import Sidebar from "../../components/layout/Sidebar";
import Stlviewer from "../../components/stlviewer";
import { useRouter } from "next/router";
import { Navbar } from "../../components/NavBar";
import { getSession } from "next-auth/react";


export default function Home({ file }) {
  return (
    <div className="flex relative w-screen h-screen">
      <Stlviewer file={file} />
      <div className="absolute w-full">
        <Navbar />
      </div>
      <div className="absolute top-12">
        <AnnotationBar file={file} />
      </div>
      <div
        className="absolute right-0 top-12"
        style={{ height: "calc(100vh - 48px)" }}
      >
        <Sidebar />
        <div className="absolute right-0 bottom-0 flex flex-row">
          <PopUp file={file} />
        </div>
      </div>
    </div>
    // {/* <div className="relative min-h-screen min-w-screen flex flex-row">
    //   <Stlviewer />
    //   <div className="absolute left-0">
    //     <AnnotationBar cardsInput={annotations} />
    //   </div>
    //   <div className="absolute right-0">
    //     <div className="absolute right-0 bottom-0 flex flex-row">
    //       <PopUp file={file} />
    //     </div>
    //     <Sidebar />
    //   </div>
    // </div> */}
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  const { id } = ctx.query;
  const file_id = parseInt(id[0]);
  const file = await getFile(file_id);
  file.cards = await getAnnotations(file);

  return {
    props: { file }, // will be passed to the page component as props
  };
};
