import { ICard } from "../types"

type AnnotationCardProps = {
	card: ICard
}
export default function AnnotationCard({card}: AnnotationCardProps) {
	return (
		<div className="w-80 text-gray-700 p-5">
			<div className="text-2xl ">
				Teveel aan fluorose
			</div>
			<div>
				Dirk heeft te veel fluorose, we zullen een facing process moeten beginnen.
			</div>
		</div>
	)
}