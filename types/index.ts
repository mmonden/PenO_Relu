export interface ICard {
  _id: number;
  title: string;
  text: string;
  new?: boolean;
  ready_in_stl: boolean;
}

export interface IFile {
  _id: number;
  title: string;
  card_ids: number[];
  cards?: ICard[];
}
