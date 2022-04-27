import { IPatient } from "../types";
import {
  AiOutlineFile,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSave,
  AiOutlineArrowRight,
  AiFillFolder,
} from "react-icons/ai";
import { useState } from "react";
import DeleteModal from "./deleteModal";
<<<<<<< HEAD
import { EditForm } from "./editForm";
=======
import { EditForm } from "./editForm"
>>>>>>> fd26c5131b5c22fdf05c346d0cb437c60a2fdd14
import Modal from "react-modal";

const customStyles = {
  content: {
<<<<<<< HEAD
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
=======
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
>>>>>>> fd26c5131b5c22fdf05c346d0cb437c60a2fdd14
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
<<<<<<< HEAD
        <div className="flex items-center space-x-2">
=======
        <div className="flex items-center space-x-2 w-full">
>>>>>>> fd26c5131b5c22fdf05c346d0cb437c60a2fdd14
          <button onClick={setPatient}>
            <a>
              <div className="flex items-center">
                <AiFillFolder className="text-5xl" />
                <div className="w-80 p-4 text-gray-700">
<<<<<<< HEAD
                  <div className="text-3xl flex left-0">{patient.name}</div>
=======
                  <div className="text-3xl flex left-0">
                    {editing ? (
                      <input
                        className="border-2"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    ) : (
                      name
                    )}
                  </div>
>>>>>>> fd26c5131b5c22fdf05c346d0cb437c60a2fdd14
                </div>
              </div>
            </a>
          </button>
          <button>
            {editOpen ? (
              <Modal isOpen={editOpen} style={customStyles}>
<<<<<<< HEAD
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
=======
                <EditForm setIsOpen={setEditOpen} patient={patient} />
              </Modal>
            ) : (
              <AiOutlineEdit onClick={() => setEditOpen(true)} className="text-3xl" />
>>>>>>> fd26c5131b5c22fdf05c346d0cb437c60a2fdd14
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
<<<<<<< HEAD
            <AiOutlineDelete className="text-3xl" />
=======
            <button onClick={() => setIsOpen(true)}>
              <AiOutlineDelete className="w-7 h-7" />
            </button>
>>>>>>> fd26c5131b5c22fdf05c346d0cb437c60a2fdd14
          )}
        </div>
      </div>
    </div>
  );
}
