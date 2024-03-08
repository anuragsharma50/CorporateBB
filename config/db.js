import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDB = async () => {
    try {
        const res = await mongoose.connect(process.env.DB_URL,{
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        })
        console.log(`mongodb connected with the server ${res.connection.host}`);
    } catch (err) {
        console.log("DB connection failed");
        console.log(err);
    }
}