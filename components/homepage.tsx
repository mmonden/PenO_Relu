import PatientList from "./patient_overview";
import FileList from "./file_overview";
import { IFile, IPatient } from "../types";
import { useState, useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { get } from "https";
import _ from "lodash";
import NavBarHome from "./NavBarHomepage";
import PatientInfo from "./patientInfo";

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
  const [patients, setPatients] = useState(patients_input);

  const getFilesFromPat = (patientID) => {
    if (patients.length == 0) {
      return [];
    } else {
      if (
        patients.filter((patient) => patient._id == patientID)[0].file_ids
          .length != 0
      ) {
        const loggedFiles = files.filter((file) =>
          patients
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
    const newLoggedFiles = getFilesFromPat(patient._id); //Manier nog om patientID te linken
    setLoggedFiles(newLoggedFiles);
    setSelectedPatient(patient);
  };

  const addFile = (file) => {
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

  const addPatient = (patient) => {
    setPatients([...patients, patient]);
  };

  const deletePatient = (oldPatient) => {
    const newPatients = patients.filter(
      (patient) => oldPatient._id != patient._id
    );
    setPatients(newPatients);
  };

  const updatePatient = (patient) => {
    const newPatients = patients.filter(
      (oldpatient) => oldpatient._id != patient._id
    );
    newPatients.push(patient);
    setPatients(newPatients);
  };

  return (
    <div className="min-w-screen min-h-screen flex relative overflow-hidden">
      <div className="w-full absolute top-0">
        <NavBarHome changePatient={changePatient} patients={patients} />
      </div>
      <div
        className="absolute left-10 top-16 w-1/3 overflow-y-auto"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <PatientList
          patients_input={patients}
          changePatient={changePatient}
          addPatient={addPatient}
          updatePatient={updatePatient}
          deletePatientCard={deletePatient}
        />
      </div>
      <div className="absolute right-10 top-16 w-7/12 h-2/6 bg-gray-200">
        <PatientInfo
          selected_patient={selectedPatient}
          files_input={[]}
          addFile={undefined}
          updateFile={undefined}
          deleteFilecard={undefined}
        />
      </div>
      <div className="absolute right-10 bottom-10 w-7/12 h-1/2 overflow-y-auto">
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
