//import { Timestamp } from "mongodb";

export interface ICard {
  _id: number;
  title: string;
  text: string;
  new?: boolean;
}

export interface IFile {
  _id: String;
  title: string;
  time?: string;
  card_ids: number[];
  cards?: ICard[];
  new?: boolean;
}
