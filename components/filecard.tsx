import { IFile, IPatient } from "../types";
import {
  AiOutlineFile,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSave,
  AiFillFile,
} from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import DeleteModal from "./deleteModal";
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

type FileCardProps = {
  file: IFile;
  deleteFile: Function;
  selectedPatient: IPatient;
  updateFile: Function;
  deleteFilecard: Function;
};

export default function FileCard({
  file,
  deleteFile,
  selectedPatient,
  updateFile,
  deleteFilecard,
}: FileCardProps) {
  const [editing, setEdit] = useState(file.new);
  const [title, setTitle] = useState(file.title);
  const [isOpen, setIsOpen] = useState(false);

  const onDelete = () => {
    deleteFile(file._id);
    fetch("/api/delete_file", {
      method: "POST",
      body: JSON.stringify({ file }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    selectedPatient.file_ids = selectedPatient.file_ids.filter(
      (ID) => ID != file._id
    );
    fetch("/api/update_patient", {
      method: "POST",
      body: JSON.stringify({ new_patient: selectedPatient }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    deleteFilecard(file);
  };

  const toggleEdit = () => {
    if (editing && title != file.title) {
      file.title = title;

      fetch("/api/update_file", {
        method: "POST",
        body: JSON.stringify({ file }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    setEdit(!editing);
    file.new = !editing;
    updateFile(file);

    //Hier moet dan nog die extra code komen voor de database (zie bij annatations)
    //Api voor gebruiken? --> zoek eens op --> niet helemaal zeker van
  };

  return (
    <div className="relative text-gray-700 text-2xl">
      <div className="flex items-center space-x-2">
        <a
          href={editing ? "javascript: void(0)" : `/view/${file._id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
            <div className="flex items-center">
              <AiFillFile className="text-5xl" />

              <div className="p-4 text-gray-700">
                <div className="text-3xl flex left-0">
                  {editing ? (
                    <input
                      className="border-2"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  ) : (
                    title
                  )}
                </div>
              </div>
            </div>
        </a>
      </div>
      <div className="absolute flex right-0 min-h-full top-0 space-x-2">
        <button onClick={toggleEdit}>
          {editing ? (
            <AiOutlineSave className="text-3xl" />
          ) : (
            <AiOutlineEdit className="text-3xl" />
          )}
        </button>
        {isOpen ? (
          <Modal isOpen={isOpen} style={customStyles}>
            <DeleteModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              onDelete={onDelete}
              string={"Wilt u dit bestand verwijderen?"}
            ></DeleteModal>
          </Modal>
        ) : (
          <button onClick={() => setIsOpen(true)}>
            <AiOutlineDelete className="text-3xl" />
          </button>
        )}
      </div>
    </div>
  );
}
