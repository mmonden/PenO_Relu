import { connectToDatabase } from "./mongodb";
import { account } from "../types";

//TODO?: getAccount ...
export async function createAccount(accountdata: account) {
    const { db } = await connectToDatabase();
    delete accountdata.new;

    const opts = {upsert: true}
	await db.collection("accounts").updateOne({"_id": accountdata._id}, {$set: accountdata}, opts)
}

export async function delAccount(accountdata: account) {
    const { db } = await connectToDatabase();

    const result = await db.collection("accounts").deleteOne({"_id": accountdata._id})
	console.log(result)
}	
