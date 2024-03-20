
import mongoose from "mongoose";


export const dbConnection = () => {
	const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        throw new Error("MONGO_URI not found ");
    }

    return mongoose.connect(
        mongoURI,
        {}
    );
};