import { connectToDatabase } from "./mongodb";
import { ICard, IFile } from "../types";
import { resourceLimits } from "worker_threads";
import { fileURLToPath } from "url";

export async function getFiles() {
	const { db } = await connectToDatabase();
	const files = await db.collection("files").find().toArray();
	return files
}

export async function getFile(id: number) {
	const { db } = await connectToDatabase();
	const file = await db.collection("files").findOne({ _id: id });
	return file
}

export async function getAnnotations(file: IFile) {
	const { db } = await connectToDatabase();
	const annotations = await db.collection("annotations").find({ _id: { $in: file.card_ids } }).toArray();
	return annotations;
}

export async function deleteFile(file: IFile) {
	const { db } = await connectToDatabase();

	const result = await db.collection("files").deleteOne({ "_id": file._id })
	var all_annotations = file.cards
	var del_annotations: any[] = []
	for (var annotation of all_annotations) {
		del_annotations.push(await db.collection("annotations").deleteOne({ "_id": annotation._id }))
	}
	return result
}

export async function updateFile(file: IFile) {
	const { db } = await connectToDatabase();
	console.log(file)
	delete file.cards;

	const opts = {upsert: true}
	const result =  db.collection("files").updateOne({"_id": file._id}, {$set: file}, opts)
	console.log(result) //Dit komt nog niet echt door denk ik --> of print toch geen resultaat af!
}

export async function writeAnnotation(annotation: ICard) {
	const { db } = await connectToDatabase();
	delete annotation.new;

	const opts = { upsert: true }
	await db.collection("annotations").updateOne({ "_id": annotation._id }, { $set: annotation }, opts)
}

export async function deleteAnnotation(annotation: ICard) {
	const { db } = await connectToDatabase();
	const result = await db.collection("annotations").deleteOne({ "_id": annotation._id })
}
