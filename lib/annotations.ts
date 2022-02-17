import { connectToDatabase } from "./mongodb";
import { ICard } from "../types";

export async function getAnnotations() {
	const { db } = await connectToDatabase();
	const annotations = await db.collection("annotations").find().toArray();
	return annotations;
}

export async function writeAnnotation(annotation: ICard) {
	const { db } = await connectToDatabase();

	const opts = {upsert: true}
	await db.collection("annotations").updateOne({"_id": annotation._id}, {$set: annotation}, opts)
}

export async function deleteAnnotation(annotation: ICard) {
	const { db } = await connectToDatabase();

	const result = await db.collection("annotations").deleteOne({"_id": annotation._id})
	console.log(result)
}
