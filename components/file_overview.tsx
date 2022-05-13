import FileCard from "./filecard";
import { IFile, IPatient } from "../types";
import { useState, useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid";
import { signOut } from "next-auth/react";
import { MdAdd } from "react-icons/md";

type FileListProps = {
  files_input: IFile[];
  selected_patient: IPatient;
  addFile: Function;
  updateFile: Function;
  deleteFilecard: Function;
};

export default function FileList({
  files_input,
  selected_patient,
  addFile,
  updateFile,
  deleteFilecard,
}: FileListProps) {
  const [files, setFiles] = useState(files_input);

  useEffect(() => {
    setFiles(files_input);
  }, [files_input]);

  const deleteFile = (fileID) => {
    setFiles(files.filter((file) => file._id != fileID));
  };

  const newFile = () => {
    const new_file: IFile = {
      _id: uuidv4(),
      title: "",
      card_ids: [],
      new: true,
    };

    selected_patient.file_ids.push(new_file._id);
    setFiles([...files, new_file]);
    fetch("/api/update_patient", {
      method: "POST",
      body: JSON.stringify({ new_patient: selected_patient }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    addFile(new_file);
  };

  return (
    <div className="">
      <div className="flex relative justify-center border-b-2">
        <p1>Scans</p1>

        {files.length > 0 ? (
          <button onClick={newFile}>
            <MdAdd className="text-3xl absolute bottom-2 right-8" style={{"strokeWidth": "0"}}/>
          </button>
        ) : (
          true
        )}
      </div>

      <div className="divide-y-2">
        {files.map((file) => {
          return (
            <FileCard
              key={Object(file._id)}
              file={file}
              deleteFile={deleteFile}
              selectedPatient={selected_patient}
              updateFile={updateFile}
              deleteFilecard={deleteFilecard}
            />
          );
        })}
      </div>
    </div>
  );
}
