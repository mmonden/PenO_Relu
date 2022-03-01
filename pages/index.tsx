import type { NextPage } from 'next'
import AnnotationBar from '../components/annotationbar'
import { getAnnotations, getFiles } from '../lib/annotations'
import { GetServerSideProps } from 'next';
import PopUp from '../components/PopUp';
;
import Stlviewer from '../components/stlviewer';

export default function Home({annotations}) {

  return (
    <div className="min-h-screen min-w-screen">
      <AnnotationBar cardsInput={annotations}/>
      <div className="flex justify-end items-end absolute inset-0 z-10">
      <PopUp />
      </div>
      <Stlviewer></Stlviewer>
    </div>
  )
}

export const Home1: NextPage = () => {
  return (
    <PopUp />
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
