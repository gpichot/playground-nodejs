import { MongoClient } from 'mongodb';
const uri = 'mongodb://localhost:27018';
const client = new MongoClient(uri);
client.connect();
const db = client.db("chat");

export default db