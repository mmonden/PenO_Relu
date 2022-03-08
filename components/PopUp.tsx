import Popup from "reactjs-popup";
import ShareButton from "./ShareButton";
import { TextField } from "@mui/material";
import React from "react";
import { IFile } from "../types";

type FileCardProps = {
  file: IFile;
};

//Hoe lees ik mijn files in en hoe weet ik welke file ik uit mijn database? --> toch een contradictie want
// ik moet mijn id daar uit halen maar ik heb mijn id daar al voor nodig.
// De oplossing is een user_id --> deze krijgen we bij de login denk ik
function GetURL({ file }: FileCardProps) {
  const id = file._id;
  console.log(id);
  let url = "http://localhost:3000/" + id.toString();
  return url;
}

//Moet dit?
const PopUp = ({ file }: FileCardProps) => {
  const url = "www.test.be";
  return (
    <Popup trigger={ShareButton} modal>
      {(close) => (
        <div className="relative border-solid rounded-lg bg-gray-200 border-2 border-gray-500">
          <div className=" border-b-red-200">
            <div className="flex items-center min-h-full min-w-full header font-semibold text-xl">
              {" "}
              Link sharing
            </div>
            <div className="flex absolute h-6 w-6 -right-3 -top-3">
              <button className="" onClick={close}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="#FF0000"
                  viewBox="0 0 24 24"
                  stroke="#000000"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <TextField
              id="filled-hidden-label-small"
              label="email"
              defaultValue="toprednax@yahoo.com"
              variant="filled"
            ></TextField>
          </div>
          <div className="flex item">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
            </button>
            <TextField
              id="filled-hidden-label-small"
              disabled
              label="Link"
              defaultValue={GetURL({ file })} //Hier kan je ook gewoon function call doen
              variant="filled"
            ></TextField>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default PopUp;
