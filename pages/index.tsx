import AnnotationBar from '../components/annotationbar'
import { getAnnotations, writeAnnotation } from '../lib/annotations'
import { GetServerSideProps } from 'next';
import Stlviewer from '../components/stlviewer';
import PopUp from '../components/PopUp';

export default function Home({annotations}) {

  return (
    <div className="min-h-screen min-w-screen">
      <AnnotationBar cardsInput={annotations}/>
      <div className="flex justify-end items-end absolute inset-0 z-10">
      <PopUp />
      </div>
      <div>
      <Stlviewer />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const annotations = await getAnnotations();
  const files = await getFiles();


  return {
    props: {annotations}, // will be passed to the page component as props
  }
}