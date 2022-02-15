import { connectToDatabase } from "./mongodb";
import { ICard } from "../types";

export async function getAnnotations() {
	const { db } = await connectToDatabase();
	const annotations = await db.collection("annotations").find().toArray();
	return annotations;
}

export async function writeAnnotation(annotation: ICard) {
	const { db } = await connectToDatabase();
	await db.collection("annotations").insertOne(annotation);
}