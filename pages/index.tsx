import AnnotationBar from '../components/annotationbar'
import { getAnnotations, writeAnnotation, getFiles} from '../lib/annotations'
import { GetServerSideProps } from 'next';
import PopUp from '../components/PopUp';
import Sidebar from '../components/layout/Sidebar';

import Stlviewer from '../components/stlviewer';

export default function Home({annotations, files}) {

export default function Home({ annotations }) {
  return (
    <div className="min-h-screen min-w-screen">
      <AnnotationBar cardsInput={annotations}/>
      <div className="flex justify-end items-end absolute inset-0 z-10">
        <PopUp/>
      </div>
      <Sidebar />
    </div>

    // <div className="min-h-screen min-w-screen">
    //   <AnnotationBar cardsInput={annotations} />
    //   <PopUp />
    //   <Stlviewer />
    // </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const files = await getFiles();
  const annotations = await getAnnotations(files[0]);


  return {
    props: {annotations, files},
     // will be passed to the page component as props
  }
}
