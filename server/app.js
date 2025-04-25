import express from "express";
import cors from "cors";
import CorsOptions from "./config/CorsOptions";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(cors(CorsOptions));
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.use('/api/auth', authRouter);

export default app;
