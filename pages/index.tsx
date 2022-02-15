import AnnotationBar from '../components/annotationbar'
import { ICard } from '../types'
import { getAnnotations, writeAnnotation } from '../lib/annotations'

export default function Home() {

  let testData: ICard[] = Array(5).fill({title:'Teveel aan fluorose', text: 'Dirk heeft te veel fluorose, we zullen een facing process moeten beginnen.'})

  return (
    <div className="min-h-screen min-w-screen">
      <AnnotationBar cards={testData}/>
    </div>
  )
}

export async function getServerSideProps(context) {

  const annotations = await getAnnotations();


  return {
    props: {annotations}, // will be passed to the page component as props
  }
}