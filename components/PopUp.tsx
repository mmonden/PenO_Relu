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
  let url = "http://localhost:3000/view/" + id.toString();
  return url;
}

const PopUp = ({ file }: FileCardProps) => {
  return (
    <Popup trigger={ShareButton} modal>
      {(close) => (
        <div className="relative border-solid rounded-lg bg-gray-300 border-2 w-48 border-gray-500 divide-y-2 divide-gray-500">
          <div>
            <div className="flex items-center min-h-full min-w-full header font-semibold text-xl">
              Link sharing
              <div className="flex absolute right-2">
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(GetURL({ file }))
                  }
                >
                  <ClipboardCopyIcon className="w-6 h-6" />
                </button>

                <button
                  onClick={() =>
                    window.open(
                      "mailto:? &subject=Relu 3D image with annotations &body=Beste collega, \r\n Hierbij de link van patient : " +
                        GetURL({ file })
                    )
                  }
                >
                  <MailOpenIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex absolute h-6 w-6 -right-3 -top-3">
              <button className="" onClick={close}>
                <XCircleIcon className="w-6 h-6 fill-red-500" />
              </button>
            </div>
          </div>

          <div className="h-10 flex items-center text-truncate overflow-auto">
            <div className="">{GetURL({ file })}</div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default PopUp;
