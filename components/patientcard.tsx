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

  const onDelete = () => {
    deletePatient(patient._id);
    fetch("/api/delete_patient", {
      method: "POST",
      body: JSON.stringify({ patient }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    deletePatientCard(patient)
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
    updatePatient(patient)
  };

  return (
    <div className="relative text-gray-700 text-2xl">
      <div className="">
        <div className="flex items-center space-x-2">
          <button onClick={setPatient}>
            <a>
              <div className="flex items-center">
                <AiFillFolder className="text-5xl" />
                <div className="w-80 p-4 text-gray-700">
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
                </div>
              </div>
            </a>
          </button>
          <button onClick={toggleEdit}>
            {editing ? (
              <AiOutlineSave className="text-3xl" />
            ) : (
              <AiOutlineEdit className="text-3xl" />
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
            <button onClick={() => setIsOpen(true)}>
              <AiOutlineDelete className="w-7 h-7" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
