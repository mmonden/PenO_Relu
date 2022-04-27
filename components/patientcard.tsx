import { IPatient } from "../types";
import { AiOutlineDelete, AiOutlineEdit, AiFillFolder } from "react-icons/ai";
import { useState } from "react";
import DeleteModal from "./deleteModal";

import { EditForm } from "./editForm";

import Modal from "react-modal";

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

type PatientCardProps = {
  patient: IPatient;
  deletePatient: Function;
  changePatient: Function;
  updatePatient: Function;
  deletePatientCard: Function;
};

export default function PatientCard({
  patient,
  deletePatient,
  changePatient,
  updatePatient,
  deletePatientCard,
}: PatientCardProps) {
  const [editing, setEdit] = useState(patient.new);
  const [name, setName] = useState(patient.name);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const onDelete = () => {
    deletePatient(patient._id);
    fetch("/api/delete_patient", {
      method: "POST",
      body: JSON.stringify({ patient }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    deletePatientCard(patient);
  };

  const setPatient = () => {
    changePatient(patient);
  };

  const toggleEdit = () => {
    if (editing && name != patient.name) {
      patient.name = name;

      fetch("/api/update_patient", {
        method: "POST",
        body: JSON.stringify({ patient }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    setEdit(!editing);
    updatePatient(patient);
  };

  return (
    <div className="relative text-gray-700 text-2xl">
      <div className="">
        <div className="flex items-center space-x-2 w-full">
          <button onClick={setPatient}>
            <a>
              <div className="flex items-center">
                <AiFillFolder className="text-5xl" />
                <div className="w-80 p-4 text-gray-700">
                  <div className="text-3xl flex left-0">{patient.name}</div>
                </div>
              </div>
            </a>
          </button>
          <button>
            {editOpen ? (
              <Modal isOpen={editOpen} style={customStyles}>
                <EditForm
                  setIsOpen={setEditOpen}
                  updatePatient={updatePatient}
                  patient={patient}
                />
              </Modal>
            ) : (
              <AiOutlineEdit
                onClick={() => setEditOpen(true)}
                className="text-3xl"
              />
            )}
          </button>
          {isOpen ? (
            <DeleteModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              onDelete={onDelete}
            >
              Wil je deze patiënt verwijderen?
            </DeleteModal>
          ) : (
            <AiOutlineDelete className="text-3xl" />
          )}
        </div>
      </div>
    </div>
  );
}
