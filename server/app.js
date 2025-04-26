const express = require("express");
const cors = require("cors");
const CorsOptions = require("./config/CorsOptions.js");
const authRouter = require("./routes/auth.routes.js");

const app = express();

app.use(cors(CorsOptions));
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.use('/api/auth', authRouter);

module.exports = app;
