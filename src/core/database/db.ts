
import mongoose from "mongoose";


export const dbConnection = () => {
	const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
        throw new Error("No se encontro el MONGO_URI ");
    }

    return mongoose.connect(
        mongoURI,
        {}
    );
};