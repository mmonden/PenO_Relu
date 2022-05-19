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
  setSelectedPatient: Function;
};

export default function PatientCard({
  patient,
  deletePatient,
  changePatient,
  updatePatient,
  deletePatientCard,
  setSelectedPatient,
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
    setSelectedPatient(null);
  };

  const setPatient = () => {
    changePatient(patient);
  };

  const toggleEdit = () => {
    if (editing && name != patient.name) {
      patient.name = name;

      fetch("/api/update_patient", {
        method: "POST",
        body: JSON.stringify({ new_patient: patient }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    setEdit(!editing);
    updatePatient(patient);
  };

  return (
    <div className="relative text-gray-700 flex flex-row">
      <div className="items-center space-x-2">
        <button onClick={setPatient}>
          <a>
            <div className="flex items-center">
              <AiFillFolder className="text-2xl" />
              <div className="pl-4 pt-2 pb-2 text-gray-700 overflow-x-auto">
                <div className="flex left-0">
                  <div className="xlarge">{patient.name}</div>
                </div>
              </div>
            </div>
          </a>
        </button>
      </div>
      <div className="absolute flex right-0" style={{ height: "100%" }}>
        <button>
          {editOpen ? (
            <Modal isOpen={editOpen} style={customStyles} ariaHideApp={false}>
              <EditForm
                setIsOpen={setEditOpen}
                updatePatient={updatePatient}
                patient={patient}
              />
            </Modal>
          ) : (
            <AiOutlineEdit
              onClick={() => setEditOpen(true)}
              className="text-2xl"
            />
          )}
        </button>
        {isOpen ? (
          <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
            <DeleteModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              onDelete={onDelete}
              string={"Wilt u deze patiënt verwijderen?"}
            ></DeleteModal>
          </Modal>
        ) : (
          <button onClick={() => setIsOpen(true)}>
            <AiOutlineDelete className="text-2xl" />
          </button>
        )}
      </div>
    </div>
  );
}
