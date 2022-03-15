import { connectToDatabase } from "./mongodb";
import { session } from "../types";

//TODO?: getSession ...
export async function createSession(sessiondata: session) {
    const { db } = await connectToDatabase();
    delete sessiondata.new;

    const opts = {upsert: true}
	await db.collection("sessions").updateOne({"_id": sessiondata._id}, {$set: sessiondata}, opts)
}

export async function delSession(sessiondata: session) {
    const { db } = await connectToDatabase();

    const result = await db.collection("sessions").deleteOne({"_id": sessiondata._id})
	console.log(result)
}
