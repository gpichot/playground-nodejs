import { MongoClient } from "mongodb";

const DB_NAME = process.env.MONGODB_DB_NAME || "formation-nodejs";
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

client.connect();

const db = client.db(DB_NAME);

export default db;
