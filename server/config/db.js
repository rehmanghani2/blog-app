import mongoose from "mongoose";

// Function to connect  to mongodb database

export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Mongo Database connected"));

        await mongoose.connect(`${process.env.MONGODB_URI}/blog-app`)
    } catch (error) {
        console.log("Error connecting to DB: ", error);
    }
}