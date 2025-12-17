import express, { application } from "express";
import connectDB from "./db_connect/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import domainRoutes from "./routes/domainRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import cors from "cors";

const app = express();
const port = 8000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
connectDB();
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/domain", domainRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.get("/", (req, res) => {
  res.send("hello world");
});
console.log("MONGO_URI:", process.env.MONGO_URI);
import "./cron/internshipcomJob.js";

app.listen(port, () => {
  console.log("server is running on port " + port);
});
