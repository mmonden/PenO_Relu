export interface ICard {
  _id: number;
  title: string;
  text: string;
  new?: boolean;
}

export interface IFile {
  _id: String;
  title: string;
  card_ids: number[];
  cards?: ICard[];
}
