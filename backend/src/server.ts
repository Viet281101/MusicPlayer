import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { userRoutes } from "./routes/userRoutes";
// import { playlistRoutes } from "./routes/playlistRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
// app.use("/api/playlists", playlistRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
	res.send("API is running!");
});
app.get("/favicon.ico", (req, res) => {
	res.status(204).end();
});
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.error(err.stack);
	res.status(500).json({ error: "Internal Server Error" });
});


