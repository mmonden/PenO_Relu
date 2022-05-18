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
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [scanDate, setScanDate] = useState(file.scanDate);

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
    if (title == "") {
      toast.error("De titel van een scan kan niet leeg zijn.", {
        className: "text-lg",
      });
    } else {
      if (editing && (title != file.title || scanDate != file.scanDate)) {
        file.title = title;
        file.scanDate = scanDate;

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
    }

    //Hier moet dan nog die extra code komen voor de database (zie bij annatations)
    //Api voor gebruiken? --> zoek eens op --> niet helemaal zeker van
  };

  return (
    <div className="relative text-gray-700 text-2xl">
      <div
        className="flex items-center space-x-2 overflow-x-auto"
        style={{ width: "90%" }}
      >
        <a
          href={editing ? "#" : `/view/${file._id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="flex items-center">
            <AiFillFile className="text-3xl" />

            <div className="pl-2 pt-2 pb-2 text-gray-700">
              <div className="flex left-0">
                {editing ? (
                  <div className="flex flex-row space-x-2">
                    <input
                      className="border-2"
                      type="text"
                      value={title}
                      placeholder="Onderwerp"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Form.Group>
                      <Form.Control
                        type="date"
                        placeholder="Datum"
                        value={scanDate}
                        onChange={(event) => setScanDate(event.target.value)}
                        required
                      />
                    </Form.Group>
                  </div>
                ) : (
                  <div className="space-x-4 flex flex-row bottom-0">
                    <div className="xlarge">{title}</div>
                    {scanDate == undefined ? (
                      true
                    ) : (
                      <div className="text-gray-500 large">{scanDate}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className="absolute flex right-0 min-h-full top-0 space-x-2">
        <button onClick={toggleEdit}>
          {editing ? (
            <AiOutlineSave className="text-2xl" />
          ) : (
            <AiOutlineEdit className="text-2xl" />
          )}
        </button>
        {isOpen ? (
          <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
            <DeleteModal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              onDelete={onDelete}
              string={"Wilt u dit bestand verwijderen?"}
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
