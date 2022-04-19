import PatientList from "./patient_overview";
import FileList from "./file_overview";
import { IFile, IPatient } from "../types";
import { useState, useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { get } from "https";
import _ from "lodash";
import { NavBarHome } from "./NavBarHomepage";

/*
$ npm i -g npm
$ npm i --save lodash
*/

type HomePageProps = {
  patients_input: IPatient[];
  files_input: IFile[];
};

export default function HomePage({
  patients_input,
  files_input,
}: HomePageProps) {
  const [selectedPatient, setSelectedPatient] = useState(patients_input[0]);
  const [files, setFiles] = useState(files_input);

  console.log(patients_input);

  const getFilesFromPat = (patientID) => {
    if (patients_input.length == 0) {
      return [];
    } else {
      console.log(patientID);
      if (
        patients_input.filter((patient) => patient._id == patientID)[0].file_ids
          .length != 0
      ) {
        console.log(patientID);
        const loggedFiles = files.filter((file) =>
          patients_input
            .filter((patient) => patient._id == patientID)[0]
            .file_ids.some((id) => file._id == id)
        );
        return loggedFiles;
      } else {
        return [];
      }
    }
  };

  const [loggedFiles, setLoggedFiles] = useState([]);

  // Deze functie dan mee doorgeven?
  const changePatient = (patient) => {
    console.log("file ids: ", patient.file_ids);
    const newLoggedFiles = getFilesFromPat(patient._id); //Manier nog om patientID te linken
    console.log("new: ", newLoggedFiles);
    setLoggedFiles(newLoggedFiles);
    console.log(loggedFiles);
    setSelectedPatient(patient);
  };

  const addFile = (file) => {
    console.log("files voor add: ", files);
    setFiles([...files, file]);
  };

  const deleteFile = (oldfile) => {
    const newFiles = files.filter((file) => file._id != oldfile._id);
    setFiles(newFiles);
  };

  const updateFile = (file) => {
    const newFiles = files.filter((oldfile) => oldfile._id != file._id);
    newFiles.push(file);
    setFiles(newFiles);
  };

  return (
    <div className="min-w-screen min-h-screen flex relative">
      <div className="w-full absolute top-0">
        <NavBarHome />
      </div>
      <div
        className="absolute left-10 top-16 w-1/3"
        style={{ height: "calc(100vh - 48px)" }}
      >
        <PatientList
          patients_input={patients_input}
          changePatient={changePatient}
        />
      </div>
      <div
        className="absolute right-10 top-16 w-1/3"
        style={{ height: "calc(100vh - 48px)" }}
      >
        <FileList
          files_input={loggedFiles}
          selected_patient={selectedPatient}
          addFile={addFile}
          updateFile={updateFile}
          deleteFilecard={deleteFile}
        />
      </div>
    </div>
  );
}
