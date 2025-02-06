import { getDbConnection } from "../utils/db";

export interface Playlist {
	id: number;
	userId: number;
	title: string;
	songs: string[];
};

export class PlaylistModel {
	static async create(userId: number, title: string, songs: string[]): Promise<void> {
		const db = await getDbConnection();
		try {
		await db.run(
			"INSERT INTO playlists (user_id, title, songs) VALUES (?, ?, ?)",
			[userId, title, JSON.stringify(songs)]
		);
		} finally {
		await db.close();
		}
	}

	static async getByUserId(userId: number): Promise<Playlist[]> {
		const db = await getDbConnection();
		try {
		const playlists = await db.all<Playlist[]>(
			"SELECT * FROM playlists WHERE user_id = ?",
			userId
		);
		return playlists;
		} finally {
		await db.close();
		}
	}
};
