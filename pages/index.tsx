import AnnotationBar from '../components/annotationbar'
import { getAnnotations, getFiles } from '../lib/annotations'
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
      <div className="...">
      <Stlviewer />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  // TODO: Now just loads random file
  const files = await getFiles()
  const annotations = await getAnnotations(files[0]);


  return {
    props: {annotations}, // will be passed to the page component as props
  }
}