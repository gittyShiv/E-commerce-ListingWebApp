import { MongoClient, Collection } from "mongodb";

let client: MongoClient | null = null;
let clientConnectPromise: Promise<void> | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (client) {
    return client;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set.");
  }
  const newClient = new MongoClient(uri);
  client = newClient;
  clientConnectPromise = newClient.connect().then(() => undefined);
  await clientConnectPromise;
  return client;
}

export async function getProductsCollection(): Promise<Collection> {
  const c = await getMongoClient();
  const db = c.db(); // default DB from URI
  return db.collection("products");
}