import { connectToDatabase } from "./mongodb";
import { user } from "../types";
import { getListSubheaderUtilityClass } from "@mui/material";

//TODO?: getuserid, verifyUser ...
export async function createUser(userdata: user) {
    const { db } = await connectToDatabase();
    delete userdata.new;

    const opts = {upsert: true}
	await db.collection("users").updateOne({"_id": userdata._id}, {$set: userdata}, opts)
}

export async function verifyUser(credentials) {
    const { db } = await connectToDatabase();

    const user = await db.collection("users").findOne({email: credentials.email})

    if (!user || user.password != credentials.password) {
        console.log('Not authenticated')
        return {
            authenticated: false,
            user: user
        }
    } else {
        console.log('Authenticated')
        return {
            authenticated: true,
            user: user
        }
    } 
}

export async function delUser(userdata: user) {
    const { db } = await connectToDatabase();

    const result = await db.collection("users").deleteOne({"_id": userdata._id})
	console.log(result)
}
