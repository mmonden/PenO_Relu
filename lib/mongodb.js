import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.DB_NAME

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
	if (cachedClient && cachedDb) {
		return {
			client: cachedClient,
			db: cachedDb,
		};
	}


	const opts = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	let client = new MongoClient(MONGODB_URI);
	await client.connect();
	let db = client.db(MONGODB_DB);

	cachedClient = client;
	cachedDb = db;

	return {
		client: cachedClient,
		db: cachedDb,
	};
}