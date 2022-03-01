export interface ICard {
	_id: number,
	title: string,
	text: string,
	new?: boolean
}

export interface IFile {
	_id: number,
	title: string,
	card_ids: number[],
	name: string,
	cards?: ICard[]
}