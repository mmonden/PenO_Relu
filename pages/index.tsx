import { GetServerSideProps } from "next";
import { getFiles, getPatients } from "../lib/annotations";
import { IPatient, IFile } from "../types";
import HomePage from "../components/homepage";
import { getSession } from "next-auth/react";

export default function Overview({ patients, files }) {
  return (
    <div className="min-h-screen min-w-screen">
      <HomePage patients_input={patients} files_input={files} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const session = await getSession(ctx);

  const patients: IPatient = await getPatients();
  // const files: IFile = await getFiles(session.user.name);
  const files: IFile = await getFiles();

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { patients, files },
  };
};
