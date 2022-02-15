import AnnotationBar from '../components/annotionbar'
import { ICard } from '../types'

export default function Home() {

  let testData: ICard[] = Array(5).fill({title:'Teveel aan fluorose', text: 'Dirk heeft te veel fluorose, we zullen een facing process moeten beginnen.'})

  return (
    <div className="min-h-screen min-w-screen">
      <AnnotationBar cards={testData}/>
    </div>
  )
}
