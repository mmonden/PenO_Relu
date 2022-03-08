import { GetServerSideProps } from 'next';
import { getFiles } from '../lib/annotations';
import { IFile } from '../types'
import FileList from '../components/file_overview';

export default function Overview({files}) {
	return (
		<div className='min-h-screen min-w-screen'>
			<FileList files_input={files}/>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const files: IFile[] =  await getFiles();

	return {
		props: {files}
	}
}

