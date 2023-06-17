import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export const db_connection = async () => {
    const mongodb = await MongoMemoryServer.create()
    const getUri = mongodb.getUri()

    const db = await mongoose.connect(getUri)
    console.log("Database connected.")
    
    return db
}