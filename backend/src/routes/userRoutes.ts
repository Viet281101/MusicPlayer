import express, { Request, Response } from "express";
import { registerUser, loginUser } from "../controllers/userController";

export const userRoutes = express.Router();

userRoutes.post("/register", (req: Request, res: Response) => {
	registerUser(req, res).catch((err) =>
		res.status(500).json({ error: "Internal Server Error", details: err.message })
	);
});

userRoutes.post("/login", (req: Request, res: Response) => {
	loginUser(req, res).catch((err) =>
		res.status(500).json({ error: "Internal Server Error", details: err.message })
	);
});
