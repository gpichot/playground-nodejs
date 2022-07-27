import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
client.connect();
const db = client.db("mongo-formation");

export default db;
