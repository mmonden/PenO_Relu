import PatientList from "./patient_overview";
import FileList from "./file_overview";
import { IFile, IPatient } from "../types";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid"
import { useSession } from "next-auth/react"

type HomePageProps = {
    patients_input: IPatient[];
    files_input: IFile[];
}


export default function HomePage({ patients_input, files_input }: HomePageProps) {
    const patient1_files = files_input.filter((file) => patients_input[0].file_ids.includes(file._id));
    const [loggedFiles, setLoggedFiles] = useState(patient1_files);
    console.log(patients_input[0]);
    console.log("logged files", loggedFiles)
    console.log("patien1: ", patient1_files)
    return (
        <div className="min-w-screen min-h-screen flex flex-col items-start m-8">
            <div className="absolute top-12">
                <PatientList patients_input={patients_input} />
                <FileList files_input={loggedFiles} />
            </div>
        </div>
    );

}