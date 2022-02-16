import AnnotationBar from '../components/annotationbar'
import { getAnnotations, writeAnnotation } from '../lib/annotations'
import { GetServerSideProps } from 'next';

export default function Home({annotations}) {

  return (
    <div className="min-h-screen min-w-screen">
      <AnnotationBar cards={annotations}/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const annotations = await getAnnotations();


  return {
    props: {annotations}, // will be passed to the page component as props
  }
}