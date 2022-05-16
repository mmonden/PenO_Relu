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
};

export default function PatientInfo({ selected_patient }: FileListProps) {
  return (
    <div className="">
      <div className="flex justify-center border-b-2 border-gray-400">
        <div className="xxlarge">Profiel</div>
      </div>
      {selected_patient != undefined ? (
        <div className="flex flex-row h-5/6 max-w-full bottom-0 space-x-10 pt-2 pb-2">
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
        <div className="h-5/6 min-w-full"></div>
      )}
    </div>
  );
}
