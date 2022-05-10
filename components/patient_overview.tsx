import PatientCard from "./patientcard";
import { IPatient } from "../types";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { AddForm } from "./addForm";
import { GrAdd } from "react-icons/gr";

type PatientListProps = {
  patients_input: IPatient[];
  changePatient: Function;
  addPatient: Function;
  updatePatient: Function;
  deletePatientCard: Function;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function PatientList({
  patients_input,
  changePatient,
  addPatient,
  updatePatient,
  deletePatientCard,
}: PatientListProps) {
  const [patients, setPatient] = useState(patients_input);
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  const deletePatient = (patientID) => {
    setPatient(patients.filter((patient) => patient._id != patientID));
  };

  const newPatient = (new_patient) => {
    console.log(new_patient);
    fetch("/api/update_patient", {
      method: "POST",
      body: JSON.stringify({ new_patient }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("saved");
    setPatient([...patients, new_patient]);
    addPatient(new_patient);
  };

  return (
    <div className="">
      <div className="relative flex justify-center items-center text-6xl border-b-2">
        Patiënten
        <div className="absolute flex right-0 top-5">
          {isOpen ? (
            <Modal isOpen={isOpen} style={customStyles}>
              <AddForm setIsOpen={setIsOpen} newPatient={newPatient} />
            </Modal>
          ) : (
            <button onClick={() => setIsOpen(true)}>
              <GrAdd className="text-3xl mx-4 text-gray-700" />
            </button>
          )}
        </div>
      </div>
      <div className="divide-y-2">
        {patients.map((patient, index) => {
          return (
            <PatientCard
              key={Object(patient._id)}
              patient={patient}
              deletePatient={deletePatient}
              changePatient={changePatient}
              updatePatient={updatePatient}
              deletePatientCard={deletePatientCard}
            />
          );
        })}
      </div>
    </div>
  );
}
