import { ICard } from "../types"
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai"
import { useState } from "react"
import { writeAnnotation } from '../lib/annotations'

type AnnotationCardProps = {
	card: ICard
}

export default function AnnotationCard({card}: AnnotationCardProps) {

	const [editing, setEdit] = useState(false)
	const [title, setTitle] = useState(card.title)
	const [text, setText] = useState(card.text)

	const toggleEdit = async () => {
		if (editing) {
			card.title = title
			card.text = text

			fetch('/api/write_anno',{
				method: 'POST',
				body: JSON.stringify({card}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}
		setEdit(editing ? false : true)
	}
	

	return (
		<div className="flex items-center">
			<form className="w-80 text-gray-700 p-5">
				<div className="text-2xl mb-2">
					{ editing ?
						<input className="border-2" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/> :
						title
					}
				</div>
				<div>
					{ editing ?
					<textarea className="w-full border-2" value={text} onChange={(e) => setText(e.target.value)}/> :
					text
				}
				</div>
			</form>
			<div className="text-gray-700 text-2xl">
				<button onClick={toggleEdit}>{editing ? <AiOutlineSave/> : <AiOutlineEdit/>}</button>
			</div>
		</div>
	)
}