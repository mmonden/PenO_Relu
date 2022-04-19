import { ObjectId, Timestamp } from "bson";

export interface account {
  _id: ObjectId;
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: string;
  expires_at: number;
  scope: string; //bv. "openId https://www.googleapis.com/auth/userinfo.email"
  token_type: string; //bv. "bearer"
  id_token: string;
  new?: boolean;
}

export interface session {
  _id: ObjectId;
  user_id: ObjectId;
  created_at: Timestamp;
  expires_at: Timestamp;
  new?: boolean;
}

export interface user {
  _id: ObjectId;
  name: string;
  role: string; //user of dentist
  email: string;
  password: string; //ehhh kijkuit hiermee
  created_at: Timestamp;
  updated_at: Timestamp;
  new?: boolean;
}

export interface ICard {
  _id: number;
  title: string;
  text: string;
  new?: boolean;
  position?: THREE.Vector3; // start position line
  endPosition?: THREE.Vector3; // end position line
}

export interface IFile {
  _id: number; // later misschien number van maken net zoals bij ICard
  title: string;
  time?: string;
  selected?: ICard;
  card_ids: number[];
  cards?: ICard[];
  new?: boolean;
}

export interface IPatient {
  _id: number;
  name: string;
  user_id: string;
  file_ids?: number[];
  new?: boolean;
}