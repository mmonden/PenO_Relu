import React from "react";
import { useState } from "react";
import { IFile } from "../types";
import {
  ClipboardCopyIcon,
  MailOpenIcon,
  ShareIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import Modal from "react-modal";
import PopUpShare from "./popUpShare";

type FileCardProps = {
  file: IFile;
};

function GetURL({ file }: FileCardProps) {
  const id = file._id;
  let url = "relu-ano.vercel.app/view/" + id.toString();
  return url;
}
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const PopUp = ({ file }: FileCardProps) => {
  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <div id="Button Container">
      {showPopUp ? (
        <Modal isOpen={showPopUp} style={customStyles}>
          <PopUpShare file={file} setShowPopUp={setShowPopUp} />
        </Modal>
      ) : (
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center"
          onClick={() => setShowPopUp(true)}
        >
          <ShareIcon className="w-6 h-6" />
          Share
        </button>
      )}
    </div>
  );

  //   <Popup trigger={ShareButton} modal>
  //     {(close) => (
  //       <div className="relative border-solid rounded-lg bg-gray-300 border-2 w-48 border-gray-500 divide-y-2 divide-gray-500">
  //         <div>
  //           <div className="flex items-center min-h-full min-w-full header font-semibold text-xl">
  //             Link sharing
  //             <div className="flex absolute right-2">
  //               <button
  //                 onClick={() =>
  //                   navigator.clipboard.writeText(GetURL({ file }))
  //                 }
  //               >
  //                 <ClipboardCopyIcon className="w-6 h-6" />
  //               </button>

  //               <button
  //                 onClick={() =>
  //                   window.open(
  //                     "mailto:? &subject=Relu 3D image with annotations &body=Beste collega, \r\n Hierbij de link van patient : " +
  //                       GetURL({ file })
  //                   )
  //                 }
  //               >
  //                 <MailOpenIcon className="w-6 h-6" />
  //               </button>
  //             </div>
  //           </div>

  //           <div className="flex absolute h-6 w-6 -right-3 -top-3">
  //             <button className="" onClick={close}>
  //               <XCircleIcon className="w-6 h-6 fill-red-500" />
  //             </button>
  //           </div>
  //         </div>

  //         <div className="h-10 flex items-center text-truncate hover:overflow-scroll">
  //           <div className="">{GetURL({ file })}</div>
  //         </div>
  //       </div>
  //     )}
  //   </Popup>
  // );
};

export default PopUp;
