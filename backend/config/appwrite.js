// Appwrite client setup for backend usage
import { Client, Storage, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your Appwrite endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID); // Your project ID

const storage = new Storage(client);

export { storage, ID };
