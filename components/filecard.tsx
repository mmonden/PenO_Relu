import { IFile } from "../types";
import { AiOutlineFile, AiOutlineDelete } from "react-icons/ai";
import Link from 'next/link';

type FileCardProps = {
    file: IFile;
};

export default function FileCard({ file }: FileCardProps) {

    const onDelete = () => {
    }


    return (
        <Link href="/">
            <a>
                <div className="flex items-center">
                    <AiOutlineFile className="text-5xl" />
                    <div className="w-120 text-gray-700 p-5">
                        <div className="text-2xl mb-2">{file.title}</div>
                        <div className="text-2xl mb-2">{file.name}</div>
                        <div></div>
                        <button className="m-2" onClick={onDelete}><AiOutlineDelete /></button>
                    </div>
                </div>
            </a>
        </Link>
    );
}
