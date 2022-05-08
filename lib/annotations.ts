import { connectToDatabase } from "./mongodb";
import { ICard, IFile, IPatient } from "../types";
import { resourceLimits } from "worker_threads";
import { fileURLToPath } from "url";
import { Session, User } from "next-auth";
import { ObjectId } from "mongodb";

export async function getFiles() {
  const { db } = await connectToDatabase();
  const files = await db.collection("files").find().toArray();
  return files;
}

export async function getFile(id: String) {
  const { db } = await connectToDatabase();
  const file = await db.collection("files").findOne({ _id: id });
  return file;
}

export async function getAnnotations(file: IFile) {
  const { db } = await connectToDatabase();
  const annotations = await db
    .collection("annotations")
    .find({ _id: { $in: file.card_ids } })
    .toArray();
  return annotations;
}

export async function getPatients() {
  const { db } = await connectToDatabase();
  const patients = await db.collection("patients").find().toArray();
  return patients;
}

export async function getPatient(id: number) {
  const { db } = await connectToDatabase();
  const patient = await db.collection("patients").findOne({ _id: id });
  return patient;
}

export async function deleteFile(file: IFile) {
  const { db } = await connectToDatabase();

  const result = await db.collection("files").deleteOne({ _id: file._id });
  var all_annotations = file.card_ids;
  console.log("all anno: ", all_annotations);
  var del_annotations: any[] = [];
  for (var annotation_id of all_annotations) {
    del_annotations.push(
      await db.collection("annotations").deleteOne({ _id: annotation_id })
    );
  }
  console.log("all deleted anno: ", del_annotations);
  return result;
}

export async function updateFile(file: IFile) {
  const { db } = await connectToDatabase();
  console.log(file);
  delete file.cards;
  delete file.new;

  const opts = { upsert: true };
  const result = db
    .collection("files")
    .updateOne({ _id: file._id }, { $set: file }, opts);
  console.log(result);
}

export async function writeAnnotation(annotation: ICard) {
  const { db } = await connectToDatabase();
  delete annotation.new;

  const opts = { upsert: true };
  await db
    .collection("annotations")
    .updateOne({ _id: annotation._id }, { $set: annotation }, opts);
}

export async function deleteAnnotation(annotation: ICard) {
  const { db } = await connectToDatabase();
  const result = await db
    .collection("annotations")
    .deleteOne({ _id: annotation._id });
}

export async function deletePatient(patient: IPatient) {
  const { db } = await connectToDatabase();
  var all_file_ids = patient.file_ids;
  console.log("all file_ids: ", all_file_ids);
  for (var file_id of all_file_ids) {
    var all_deleted_files: any[] = [];
    var file = await db.collection("files").findOne({ _id: file_id });
    var all_annotations_ids = file.card_ids;
    console.log("all annotation_ids: ", all_annotations_ids);
    var all_deleted_annotations: any[] = [];
    for (var annotation_id of all_annotations_ids) {
      console.log(all_annotations_ids);
      all_deleted_annotations.push(
        await db.collection("annotations").deleteOne({ _id: annotation_id })
      );
    }
    all_deleted_files.push(
      await db.collection("files").deleteOne({ _id: file_id })
    );
  }
  console.log("del anno: ", all_deleted_annotations);
  console.log("del files: ", all_deleted_files);
  const result = await db
    .collection("patients")
    .deleteOne({ _id: patient._id });
  return result;
}

export async function updatePatient(patient: IPatient) {
  const { db } = await connectToDatabase();
  console.log("Updating patient...");
  console.log(patient);
  delete patient.new;

  const opts = { upsert: true };
  const result = db
    .collection("patients")
    .updateOne({ _id: patient._id }, { $set: patient }, opts);
  console.log(result);
}
