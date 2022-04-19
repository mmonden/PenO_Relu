import { IPatient } from "../types";
import {
    AiOutlineFile,
    AiOutlineDelete,
    AiOutlineEdit,
    AiOutlineSave,
    AiOutlineArrowRight
} from "react-icons/ai";
import { useState } from "react";


type PatientCardProps = {
    patient: IPatient;
    deletePatient: Function;
    changePatient: Function;
};

export default function PatientCard({ patient, deletePatient, changePatient }: PatientCardProps) {
    const [editing, setEdit] = useState(patient.new);
    const [name, setName] = useState(patient.name);

    const onDelete = () => {
        deletePatient(patient._id);
        fetch("/api/delete_patient", {
            method: "POST",
            body: JSON.stringify({ patient }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    const setPatient = () => {
        changePatient(patient)
    }

    const toggleEdit = () => {
        if (editing && name != patient.name) {
            patient.name = name;

            fetch("/api/update_patient", {
                method: "POST",
                body: JSON.stringify({ patient }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
        }

        setEdit(!editing);
    };



    return (
        <div className="relative text-gray-700 text-2xl">
            <div className="absolute top-6 -right-12">
                <button onClick={setPatient}>
                    <AiOutlineArrowRight className="w-7 h-7" />
                </button>
            </div>
            <div className="absolute top-6 -right-6">
                <button onClick={onDelete}>
                    <AiOutlineDelete className="w-7 h-7" />
                </button>
            </div>
            <div className="">
                <div className="flex items-center">
                    <a>
                        <div className="flex items-center">
                            <AiOutlineFile className="text-5xl" />
                            <div className="w-80 text-gray-700 p-5">
                                <div className="text-2xl mb-2">
                                    {editing ? (
                                        <input
                                            className="border-2"
                                            type="text"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    ) : (
                                        name
                                    )}
                                </div>
                            </div>
                        </div>
                    </a>
                    <button onClick={toggleEdit}>
                        {editing ? (
                            <AiOutlineSave className="text-3xl" />
                        ) : (
                            <AiOutlineEdit className="text-3xl" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );

}