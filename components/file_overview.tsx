import FileCard from "./filecard";
import { IFile } from "../types";
import { useState } from "react";

type FileListProps = {
  files: IFile[];
};

export default function FileList({ files }: FileListProps) {
    const [newFiles, setCards] = useState(files);

    const deleteFile = (fileID) => {
        setCards(newFiles.filter((file) => file._id != fileID));
    }

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
