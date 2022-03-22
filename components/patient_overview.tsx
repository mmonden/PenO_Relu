import PatientCard from "./patientcard";
import { IFile, IPatient } from "../types";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid"
import { useSession } from "next-auth/react"

type PatientListProps = {
    patients_input: IPatient[];
  };

//Patient_uinput

export default function HomePage({ patients_input }: PatientListProps) {

    const [patients, setPatient] = useState(patients_input);
    const session = useSession()
    console.log(session)

    // const deleteFile = (fileID) => {
    //     setFiles(files.filter((file) => file._id != fileID));
    // };

    const deletePatient = (patientID) => {
        setPatient(patients.filter((patient) => patient._id != patientID));
    };

    // const newFile = () => {
    //     const new_file: IFile = {
    //     _id: uuidv4(),
    //     title: "",
    //     card_ids: [],
    //     new: true,
    //     };
    //     setFiles([...files, new_file]);
    // };

    const newPatient = () => {
        const new_patient: IPatient = {
        _id: uuidv4(),
        name: "",
        user_id: "",
        new: true,
        };
        setPatient([...patients, new_patient]);
    };



    return (
        <div className="min-w-screen min-h-screen flex flex-col items-start m-8">
            <div className="flex justify-start justify-items-start">
                <div className="flex justify-center items-center text-6xl my-4 border-b-2 border-black h-fit pb-4">
                    Patiënten
                    <button onClick={newPatient}>
                        <GrAdd className="text-3xl m-5"/>
                    </button>
                </div>
            </div>
            <div className="divide-y-2 ">
                {patients.map((item, index) => {
                    return <PatientCard key={index} patient={item} deletePatient={deletePatient} />;
                })}
            </div>
        </div>
  );
}
