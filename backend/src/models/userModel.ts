import { getDbConnection } from "../utils/db";

export interface User {
	id: number;
	email: string;
	password: string;
};

export class UserModel {
	static async create(email: string, hashedPassword: string): Promise<void> {
		const db = await getDbConnection();
		try {
		await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [
			email,
			hashedPassword,
		]);
		} finally {
		await db.close();
		}
	}

	static async findByEmail(email: string): Promise<User | null> {
		const db = await getDbConnection();
		try {
		const user = await db.get<User>(
			"SELECT * FROM users WHERE email = ?",
			email
		);
		return user || null;
		} finally {
		await db.close();
		}
	}
};
