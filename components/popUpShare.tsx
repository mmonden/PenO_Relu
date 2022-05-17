import {
  ClipboardCopyIcon,
  MailOpenIcon,
  XCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { IFile, IPatient } from "../types";

type PopUpShareTypes = {
  file: IFile;
  setShowPopUp: Function;
  patients: IPatient[];
};

export default function PopUpShare({
  file,
  setShowPopUp,
  patients,
}: PopUpShareTypes) {
  const GetURL = () => {
    const id = file._id;
    let url = "relu-ano.vercel.app/view/" + id.toString();
    return url;
  };
  const selectedPatient = patients.filter((patient) =>
    patient.file_ids.includes(file._id)
  )[0];

  return (
    <div>
      <div>
        <div className="flex relative flex-row min-w-full items-center">
          <div className="text-2xl font-bold">Link sharing</div>
          <div className="space-x-2 absolute flex right-0">
            <button onClick={() => navigator.clipboard.writeText(GetURL())}>
              <ClipboardCopyIcon className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                window.open(
                  "mailto:? &subject=AnnoSend 3D scan met annotaties &body=Beste collega,\r Hierbij de link naar de scan met toegevoegde annotaties. \rPatiënt: " +
                    selectedPatient.name +
                    "\r\n\r\n Link: " +
                    GetURL() +
                    "\r\n Met collegiale groeten"
                )
              }
            >
              <MailOpenIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex absolute h-6 w-6 right-0 top-0">
          <button className="" onClick={() => setShowPopUp(false)}>
            <XIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="h-10 flex items-center text-truncate hover:overflow-scroll">
        <div className="">{GetURL()}</div>
      </div>
    </div>
  );
}
