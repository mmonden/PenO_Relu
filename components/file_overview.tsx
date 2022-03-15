import FileCard from "./filecard";
import { IFile } from "../types";
import { useState } from "react";

type FileListProps = {
  files_input: IFile[];
};

export default function FileList({ files_input }: FileListProps) {
    //console.log(files_input)

    const [files, setCards] = useState(files_input);

    const deleteFile = (fileID) => {
        setCards(files.filter((file) => file._id != fileID));
    };

    return (
        <div className="min-w-screen min-h-screen flex flex-col items-start m-8">
            <div className="flex justify-start justify-items-start">
                <div className="flex justify-start justify-items-start text-6xl my-4 border-b-2 border-black h-fit pb-4">
                    Jouw bestanden
                </div>
            </div>
            <div className="divide-y-2 ">
                {files.map((item, index) => {
                    return <FileCard key={index} file={item} deleteFile={deleteFile} />;
                })}
            </div>
        </div>
  );
}
