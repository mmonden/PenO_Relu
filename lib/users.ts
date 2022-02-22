import { connectToDatabase } from "./mongodb";
import { user } from "../types";

//TODO?: getuserid, verifyUser ...
export async function createUser(userdata: user) {
    const { db } = await connectToDatabase();
    delete userdata.new;

    const opts = {upsert: true}
	await db.collection("users").updateOne({"_id": userdata._id}, {$set: userdata}, opts)
}

export async function delUser(userdata: user) {
    const { db } = await connectToDatabase();

    const result = await db.collection("users").deleteOne({"_id": userdata._id})
	console.log(result)
}
