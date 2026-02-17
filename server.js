import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("✅ Task Manager API Running (In-Memory Mode)"));
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
