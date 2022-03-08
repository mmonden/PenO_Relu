import Popup from "reactjs-popup";
import ShareButton from "./ShareButton";
import { TextField } from "@mui/material";
import React from "react";
import { IFile } from "../types";
import {
  ClipboardCopyIcon,
  MailOpenIcon,
  XCircleIcon,
} from "@heroicons/react/outline";

type FileCardProps = {
  file: IFile;
};

function GetURL({ file }: FileCardProps) {
  const id = file._id;
  console.log(id);
  let url = "http://localhost:3000/" + id.toString();
  return url;
}

const PopUp = ({ file }: FileCardProps) => {
  return (
    <Popup trigger={ShareButton} modal>
      {(close) => (
        <div className="relative border-solid rounded-lg bg-gray-300 border-2 border-gray-500">
          <div className=" border-b-red-200">
            <div className="flex items-center min-h-full min-w-full header font-semibold text-xl">
              {" "}
              Link sharing
            </div>
            <div className="flex absolute h-6 w-6 -right-3 -top-3">
              <button className="" onClick={close}>
                <XCircleIcon className="w-6 h-6 fill-red-500" />
              </button>
            </div>
          </div>
          <div className="flex row">
            <TextField
              id="filled-hidden-label-small"
              disabled
              label="Link"
              defaultValue={GetURL({ file })}
              variant="filled"
            ></TextField>
            <div className="absolute right-0">
              <button
                onClick={() => navigator.clipboard.writeText(GetURL({ file }))}
              >
                <ClipboardCopyIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  window.open(
                    "mailto:? &subject=Relu 3D image with annotations &body=Beste collega \n hierbij de link van patient x: " +
                      GetURL({ file })
                  )
                }
              >
                <MailOpenIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default PopUp;
