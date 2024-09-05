import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();


// Import routers
import authRouter from "./routes/auth";
import dbRouter from "./routes/db";

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(dbRouter);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../../client/dist")));

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Server running on port", port);
});
