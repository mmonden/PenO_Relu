import Image from "next/image";
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
  loggedFiles: IFile[];
};

export default function PatientInfo({ selected_patient }: FileListProps) {
  return (
    <div className="relative min-h-full min-w-full ">
      <div className="absolute min-w-full h-1/6 flex justify-center text-3xl border-b-2 border-black">
        Profiel
      </div>
      {selected_patient != undefined ? (
        <div className="absolute flex flex-row h-5/6 min-w-full bottom-0 space-x-10 overflow-y-auto">
          <div className="flex items-center pl-4">
            {typeof selected_patient.picture != "undefined" &&
            selected_patient.picture != "" ? (
              <Image
                src={selected_patient.picture}
                alt="Photo"
                width={140}
                height={180}
              />
            ) : (
              <Image
                src={require("./images/Default.png")}
                alt="Photo"
                width={140}
                height={180}
              />
            )}
          </div>
          <div className="flex flex-column justify-center">
            <p>
              <span className="font-bold">Naam: </span>
              <span>{selected_patient.name} </span>
            </p>
            <p>
              <span className="font-bold">Geslacht: </span>
              <span>{selected_patient.sex}</span>
            </p>
            <p>
              <span className="font-bold">Geboorte: </span>
              <span>{selected_patient.birth} </span>
            </p>
            <p>
              <span className="font-bold">Extra info: </span>
              <span> {selected_patient.extraInfo} </span>
            </p>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
