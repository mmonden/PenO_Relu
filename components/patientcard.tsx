import { IPatient } from "../types";
import {
    AiOutlineFile,
    AiOutlineDelete,
    AiOutlineEdit,
    AiOutlineSave,
} from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";


type PatientCardProps = {
    patient: IPatient;
};

export default function PatientCard({patient}: PatientCardProps) {

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

    const toggleEdit = () => {

        if (title != file.title) {
			file.title = title

			fetch('/api/update_file', {
				method: 'POST',
				body: JSON.stringify({ file }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}

        setEdit(!editing);

        //Hier moet dan nog die extra code komen voor de database (zie bij annatations)
        //Api voor gebruiken? --> zoek eens op --> niet helemaal zeker van
    };



    return (
        <div className="relative text-gray-700 text-2xl">
            <div className="absolute top-6 -right-10">
                <button onClick={onDelete}>
                    <AiOutlineDelete className="w-7 h-7" />
                </button>
            </div>
            <div className="">
                <div className="flex items-center">
                    <Link href= {editing ? "javascript: void(0)" : `/view/${file._id}` }>
                        <a>
                            <div className="flex items-center">
                                <AiOutlineFile className="text-5xl" />
                                <div className="w-80 text-gray-700 p-5">
                                    <div className="text-2xl mb-2">
                                        {editing ? (
                                            <input
                                                className="border-2"
                                                type="text"
                                                value={title}
                                                onChange={(e) =>
                                                    setTitle(e.target.value)
                                                }
                                            />
                                        ) : (
                                            title
                                        )}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </Link>
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