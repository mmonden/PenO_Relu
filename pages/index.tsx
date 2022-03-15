import { GetServerSideProps } from "next";
import { getFiles } from "../lib/annotations";
import { IFile } from "../types";
import FileList from "../components/file_overview";
import { getSession } from "./node_modules/next-auth/react";

export default function Overview({ files }) {
  return (
    <div className="min-h-screen min-w-screen">
      <FileList files_input={files} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const files: IFile[] = await getFiles();
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { files },
  };
};
