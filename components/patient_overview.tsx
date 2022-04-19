import PatientCard from "./patientcard";
import { IPatient } from "../types";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";

type PatientListProps = {
  patients_input: IPatient[];
  changePatient: Function;
};

export default function PatientList({
  patients_input,
  changePatient,
}: PatientListProps) {
  const [patients, setPatient] = useState(patients_input);
  const session = useSession();

  const deletePatient = (patientID) => {
    setPatient(patients.filter((patient) => patient._id != patientID));
  };

  const newPatient = () => {
    const new_patient: IPatient = {
      _id: uuidv4(),
      name: "",
      user_id: "",
      file_ids: [],
      new: true,
    };
    console.log(newPatient);
    setPatient([...patients, new_patient]);
  };

  return (
    <div>
      <div className="flex justify-center items-center text-6xl border-b-2">
        Patiënten
      </div>
      <div className="">
        {patients.map((patient, index) => {
          return (
            <PatientCard
              key={patient._id}
              patient={patient}
              deletePatient={deletePatient}
              changePatient={changePatient}
            />
          );
        })}
      </div>
    </div>
  );
}
