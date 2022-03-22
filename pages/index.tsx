import { GetServerSideProps } from "next";
import { getPatients } from "../lib/annotations";
import { IPatient } from "../types";
import HomePage from "../components/patient_overview";
import { getSession } from "next-auth/react";

export default function Overview({ patients }) {
  return (
    <div className="min-h-screen min-w-screen">
      <HomePage patients_input={patients} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const patients: IPatient = await getPatients();
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
    props: { patients },
  };
};
