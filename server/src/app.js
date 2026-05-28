import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import itineraryRoutes from "./routes/itineraryRoutes.js";

const app = express();


// VERY OPEN CORS FOR DEVELOPMENT
app.use(cors());




// Body Parsers
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// Logs
app.use(morgan("dev"));


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/itineraries", itineraryRoutes);


// Health Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Orbitra API Running",
  });
});

export default app;