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
  const [selectedPatient, setSelectedPatient] = useState(null);
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
    <div className="flex flex-col space-y-1 overflow-hidden h-screen min-w-screen">
      <div className="w-full">
        <NavBarHome changePatient={changePatient} patients={patients} />
      </div>

      <div className="flex flex-row overflow-hidden space-x-5 px-2">
        <div className="overflow-y-auto" style={{ width: "30%" }}>
          <PatientList
            patients_input={patients}
            changePatient={changePatient}
            addPatient={addPatient}
            updatePatient={updatePatient}
            deletePatientCard={deletePatient}
          />
        </div>

        <div
          className="flex flex-col overflow-y-auto min-w-fit"
          style={{ width: "70%" }}
        >
          <div className="bg-gray-200">
            <PatientInfo
              selected_patient={selectedPatient}
              files_input={[]}
              addFile={undefined}
              updateFile={undefined}
              deleteFilecard={undefined}
            />
          </div>

          <FileList
            files_input={loggedFiles}
            selected_patient={selectedPatient}
            addFile={addFile}
            updateFile={updateFile}
            deleteFilecard={deleteFile}
          />
        </div>
      </div>
    </div>
  );
}
