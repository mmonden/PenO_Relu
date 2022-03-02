import AnnotationBar from '../components/annotationbar'
import { getAnnotations, writeAnnotation, getFiles} from '../lib/annotations'
import { GetServerSideProps } from 'next';
<<<<<<< HEAD
import PopUp from '../components/PopUp';
import Sidebar from '../components/layout/Sidebar';

=======
import Stlviewer from '../components/stlviewer';
import PopUp from '../components/PopUp'
>>>>>>> 35f66b05fe27823e22347ed989880833792689ef

export default function Home({annotations, files}) {

  return (
    <div className="min-h-screen min-w-screen">
      <AnnotationBar cardsInput={annotations}/>
      <div className="flex justify-end items-end absolute inset-0 z-10">
<<<<<<< HEAD
        <PopUp />
=======
      <PopUp file={files[0]} />
      </div>
      <div>
      <Stlviewer />
>>>>>>> 35f66b05fe27823e22347ed989880833792689ef
      </div>
      <Sidebar />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const files = await getFiles();
  const annotations = await getAnnotations(files[0]);


  return {
    props: {annotations, files},
     // will be passed to the page component as props
  }
}