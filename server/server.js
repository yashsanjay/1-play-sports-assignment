import { pool } from "./config/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

app.use("/tasks", taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

pool.query("SELECT NOW()")
  .then(() => console.log("DB Connected "))
  .catch(err => console.error("DB Error ", err));
app.listen(PORT, () => console.log(`Server running on ${PORT}`));