import { ObjectId, Timestamp } from "bson";

export interface account {
    _id: ObjectId,
    provider: string,
    type: string,
    providerAccountId: string,
    access_token: string,
    expires_at: number,
    scope: string, //bv. "openId https://www.googleapis.com/auth/userinfo.email"
    token_type: string, //bv. "bearer"
    id_token: string,
    new?: boolean
}

export interface session {
    _id: ObjectId,
    user_id: ObjectId,
    created_at: Timestamp,
    expires_at: Timestamp,
    new?: boolean
}

export interface user {
    _id: ObjectId,
    name: string,
    role: string, //user of dentist
    email: string,
    password: string, //ehhh nothing to see here, is voor beveiliging en niet het echte w8woord
    created_at: Timestamp,
    updated_at: Timestamp,
    new?: boolean
}
