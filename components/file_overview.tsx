import FileCard from "./filecard";
import { IFile, IPatient } from "../types";
import { useState, useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid";
import { signOut } from "next-auth/react";

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
      body: JSON.stringify({ patient: selected_patient }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    addFile(new_file);
  };

  return (
    <div>
      <div className="flex justify-center items-center text-6xl border-b-2">
        Scans
      </div>
      <button onClick={newFile}>
        <GrAdd className="text-3xl m-5" />
      </button>
    </div>
    // <div
    //   className="flex flex-col items-start m-8"
    //   style={{ height: "calc(100vh - 48px)" }}
    // >
    //   <div className="flex justify-start justify-items-start">
    //     <div className="flex justify-center items-center text-6xl my-4 border-b-2 border-black h-fit pb-4">
    //       Patiënt bestanden
    //       <button onClick={newFile}>
    //         <GrAdd className="text-3xl m-5" />
    //       </button>
    //     </div>
    //   </div>
    //   <div className="divide-y-2 ">
    //     {files.map((file) => {
    //       return (
    //         <FileCard
    //           key={file._id}
    //           file={file}
    //           deleteFile={deleteFile}
    //           selectedPatient={selected_patient}
    //           updateFile={updateFile}
    //           deleteFilecard={deleteFilecard}
    //         />
    //       );
    //     })}
    //   </div>
    // </div>
  );
}
