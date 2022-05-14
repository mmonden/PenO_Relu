import PatientCard from "./patientcard";
import { IPatient } from "../types";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { AddForm } from "./addForm";
import { rgbToHex } from "@mui/material";
import { height } from "@mui/system";

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
    fetch("/api/update_patient", {
      method: "POST",
      body: JSON.stringify({ new_patient }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPatient([...patients, new_patient]);
    addPatient(new_patient);
  };

  const sortedPatients = []
    .concat(patients)
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <div className="relative">
      <div className="flex justify-center items-center border-b-2">
        <div className="xxlarge">Patiënten</div>
        <div className="absolute right-0 flex justify-center">
          {isOpen ? (
            <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
              <AddForm setIsOpen={setIsOpen} newPatient={newPatient} />
            </Modal>
          ) : (
            <button onClick={() => setIsOpen(true)}>
              <MdAdd className="text-3xl" style={{ strokeWidth: "0" }} />
            </button>
          )}
        </div>
      </div>
      <div className="divide-y-2 h-screen overflow-y-auto overflow-x-auto ">
        {sortedPatients.map((patient, index) => {
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
