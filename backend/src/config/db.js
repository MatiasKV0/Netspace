import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGO_URL;

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
    try {
			await client.connect();
			console.log("Conectado a MongoDB!");
    } catch (error) {
      console.error("Error de conexión a MongoDB:", error);
      throw error;
    }
  }
  
export {client};

export default connectDB;