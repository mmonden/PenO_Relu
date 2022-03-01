import { ICard } from "../types"
import { AiOutlineEdit, AiOutlineSave, AiOutlineDelete } from "react-icons/ai"
import { useState } from "react"

type AnnotationCardProps = {
	card: ICard,
	deleteCard: Function
}

export default function AnnotationCard({ card, deleteCard }: AnnotationCardProps) {

	const [editing, setEdit] = useState(card.new)
	const [title, setTitle] = useState(card.title)
	const [text, setText] = useState(card.text)

	const toggleEdit = () => {
		if (editing && (title != card.title || text != card.text)) {
			card.title = title
			card.text = text

			fetch('/api/write_anno', {
				method: 'POST',
				body: JSON.stringify({ card }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}
		setEdit(editing ? false : true)
	}

	const onDelete = () => {
		deleteCard(card._id)

		fetch('/api/delete_anno', {
			method: 'POST',
			body: JSON.stringify({ card }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}


	return (
		<div className="flex items-center">
			<form className="w-80 text-gray-700 p-5">
				<div className="text-2xl mb-2">
					{editing ?
						<input className="border-2" type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> :
						title
					}
				</div>
				<div>
					{editing ?
						<textarea className="w-full border-2" value={text} onChange={(e) => setText(e.target.value)} /> :
						text
					}
				</div>
			</form>
			<div className="text-gray-700 text-2xl">
				<button className="m-2" onClick={toggleEdit}>{editing ? <AiOutlineSave /> : <AiOutlineEdit />}</button>
				<button className="m-2" onClick={onDelete}><AiOutlineDelete /></button>
			</div>
		</div>
	)
}