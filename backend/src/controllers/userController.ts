import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../utils/db";

const SECRET = process.env.JWT_SECRET || "supersecret";

export const registerUser = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: "Email and password are required." });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const db = await getDbConnection();

	try {
		await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [
			email,
			hashedPassword,
		]);
		return res.status(201).json({ message: "User registered successfully." });
	} catch (error) {
		return res.status(400).json({ error: "Email already exists." });
	} finally {
		await db.close();
	}
};

export const loginUser = async (
	req: Request,
	res: Response
): Promise<Response | void> => {
	const { email, password } = req.body;
	const db = await getDbConnection();

	try {
		const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ error: "Invalid credentials." });
		}

		const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });
		return res.status(200).json({ token });
	} catch (error) {
		return res.status(500).json({ error: "Something went wrong." });
	} finally {
		await db.close();
	}
};
