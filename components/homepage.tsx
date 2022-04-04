import PatientList from "./patient_overview";
import FileList from "./file_overview";
import { IFile, IPatient } from "../types";
import { useState, useCallback } from "react";
import { GrAdd } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid"
import { useSession } from "next-auth/react"
import { get } from "https";

type HomePageProps = {
    patients_input: IPatient[];
    files_input: IFile[];
}


export default function HomePage({ patients_input, files_input }: HomePageProps) {

    const getFilesFromPat = (patientID) => {
        console.log(patientID)
        const loggedFiles = files_input.filter((file) => patients_input[(patientID-1)].file_ids.some((id) => file._id == id))
        return loggedFiles
    }; 

    const [loggedFiles, setLoggedFiles] = useState(getFilesFromPat(1));

    // Deze functie dan mee doorgeven?
    const changePatient = (patientID) => {
        const newLoggedFiles = getFilesFromPat(patientID) //Manier nog om patientID te linken
        const first_length = loggedFiles.length
        // for (let i=first_length-1; i>0; i--){
        //     loggedFiles.splice(i)
        // }

        // for (let i=0; i<newLoggedFiles.length; i++){
        //     loggedFiles.push(newLoggedFiles[i])
        // }
        useCallback(() => setLoggedFiles(newLoggedFiles), [])

    }

    return (
        <div className="min-w-screen min-h-screen flex flex-col items-start m-8">
            <div className="absolute top-12">
                <PatientList patients_input={patients_input} changePatient = {changePatient}/>
                <FileList files_input={loggedFiles} />
            </div>
        </div>
    );

}