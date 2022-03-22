import FileCard from "./filecard";
import { IFile } from "../types";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid"


type FileListProps = {
  files_input: IFile[];
};

export default function FileList({ files_input }: FileListProps) {

    const [files, setFiles] = useState(files_input);

    const deleteFile = (fileID) => {
        setFiles(files.filter((file) => file._id != fileID));
    };

    const newFile = () => {
        const new_file: IFile = {
        _id: uuidv4(),
        title: "",
        card_ids: [],
        new: true,
        };
        setFiles([...files, new_file]);
    };

    return (
        <div className="min-w-screen min-h-screen flex flex-col items-start m-8">
            <div className="flex justify-start justify-items-start">
                <div className="flex justify-center items-center text-6xl my-4 border-b-2 border-black h-fit pb-4">
                    Jouw bestanden
                    <button onClick={newFile}>
                        <GrAdd className="text-3xl m-5"/>
                    </button>
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