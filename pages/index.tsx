import AnnotationBar from '../components/annotationbar'
import { getAnnotations, getFiles } from '../lib/annotations'
import { GetServerSideProps } from 'next';

export default function Home({ annotations, files }) {

  return (
    <div className="min-h-screen min-w-screen">
      <AnnotationBar cardsInput={annotations} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  // TODO: Now just loads random file
  const files = await getFiles()
  const annotations = await getAnnotations(files[0]);


  return {
    props: { annotations }, // will be passed to the page component as props
  }
}