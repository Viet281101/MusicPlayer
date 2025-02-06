import { getDbConnection } from "./db";

const initDb = async () => {
	const db = await getDbConnection();

	await db.exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			email TEXT UNIQUE NOT NULL,
			password TEXT NOT NULL
		)
	`);

	await db.exec(`
		CREATE TABLE IF NOT EXISTS playlists (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id INTEGER NOT NULL,
			title TEXT NOT NULL,
			songs TEXT,
			FOREIGN KEY (user_id) REFERENCES users(id)
		)
	`);

	console.log("Database initialized.");
	await db.close();
};

initDb().catch((err) => console.error(err));
