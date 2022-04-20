import FileCard from "./filecard";
import { IFile, IPatient } from "../types";
import { useState, useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid";
import { signOut } from "next-auth/react";
import { MdAdd } from "react-icons/md";
import Image from "next/image";

export default function PatientInfo() {
  return (
    <div className="min-h-full min-w-full">
      <div className="flex justify-center text-3xl border-b-2 border-black">
        Profiel
      </div>
      <div className="flex flex-row min-w-full min-h-full ">
        <div className="flex items-center justify-center left-10">
          <Image
            src={require("./images/Patient_1.jpg")}
            className=""
            alt="Photo"
            width={150}
            height={180}
          />
        </div>
        <div className="left-10 w-full">
          <p>
            <span className="font-bold">Naam: </span>
            <span>Xander Pottier </span>
          </p>
          <p>
            <span className="font-bold">Geslacht: </span>
            <span>M</span>
          </p>
          <p>
            <span className="font-bold">Geboorte: </span>
            <span>29/06/2001 </span>
          </p>
          <p>
            <span className="font-bold">Beroep: </span>
            <span> Front end Developer </span>
          </p>
        </div>
      </div>
    </div>
  );
}
