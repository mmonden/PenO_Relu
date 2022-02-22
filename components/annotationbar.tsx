import AnnotationCard from "./annotationcard";
import { ICard } from "../types";
import { GrAdd } from "react-icons/gr"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

type AnnotationBarProps = {
	cardsInput: ICard[]
}

export default function AnnotationBar({ cardsInput }: AnnotationBarProps) {
	const [cards, setCards] = useState(cardsInput);
	const deleteCard = (cardID) => {
		setCards(cards.filter((card) => card._id != cardID))
	}

	const newCard = () => {
		const new_card: ICard = {
			"_id": uuidv4(),
			"title": "",
			"text": "",
			"new": true
		}
		setCards([...cards, new_card]);
		
	}
	
	return (
		<div className="w-1/4 min-h-screen border-black border rounded-r-[5rem] flex flex-col items-center ">
			<div id="header_annobar" className="flex justify-center items-center">
				<div className='flex justify-center text-6xl my-4 border-b-2 border-black h-fit pb-4 w-80'>
					Annotaties
				</div>
				<button onClick={newCard}><GrAdd className="text-3xl m-5 text-gray-700"/></button>
			</div>
			<div className="divide-y-2 ">
				{cards.map((item, index) =>{
					return <AnnotationCard key={index} card={item} deleteCard={deleteCard}/>
				})}
			</div>
		</div>
	)
}