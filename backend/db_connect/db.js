import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
   try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI not found in .env");
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB Atlas:", err.message);
    process.exit(1);
  }
};

export default connectDB;
