import { MongoClient, Collection } from "mongodb";
import env from "dotenv";
import { List, Item } from "../models/mongo/documents";

env.config();

const url = process.env.MONGO_DB_URL;

export const collections: { list?: Collection<List>; item?: Collection<Item> } = {};

export async function connectToDatabase() {
  const client = new MongoClient(`${url}`);

  await client.connect();

  const db = client.db(process.env.DB_NAME);

  const listCollection = db.collection<List>("list");
  const itemCollection = db.collection<Item>("item");

  collections.list = listCollection;
  collections.item = itemCollection;

  console.log(`Successfully connected to database: ${db.databaseName} and collections`);
}
