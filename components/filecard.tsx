import { IFile } from "../types";
import { AiOutlineFile } from "react-icons/ai";
import Link from 'next/link';

type FileCardProps = {
    file: IFile;
};

export default function FileCard({ file }: FileCardProps) {
    return (
        <Link href="/">
			<a>
            <div className="flex items-center">
                <AiOutlineFile className="text-5xl" />
                <div className="w-80 text-gray-700 p-5">
                    <div className="text-2xl mb-2">{file.title}</div>
                    <div></div>
                </div>
            </div>
			</a>
        </Link>
    );
}
