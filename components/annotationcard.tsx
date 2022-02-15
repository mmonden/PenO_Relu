import { ICard } from "../types"

type AnnotationCardProps = {
	card: ICard
}
export default function AnnotationCard({card}: AnnotationCardProps) {
	return (
		<div className="w-80 text-gray-700 p-5">
			<div className="text-2xl ">
				{card.title}
			</div>
			<div>
				{card.text}
			</div>
		</div>
	)
}