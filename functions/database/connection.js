import ENV from "../env.config.js"
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export const db_connection = async () => {
    // const mongodb = await MongoMemoryServer.create()
    const db = await mongoose.connect(ENV.URI)
    console.log("Database connected.")
    return db
}