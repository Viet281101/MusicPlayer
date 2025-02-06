import { Request, Response } from "express";
import { PlaylistModel } from "../models/playlistModel";

export const createPlaylist = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { userId, title, songs } = req.body;

	if (!userId || !title || !songs) {
		return res.status(400).json({ error: "All fields are required." });
	}

	try {
		await PlaylistModel.create(userId, title, songs);
		return res.status(201).json({ message: "Playlist created successfully." });
	} catch (error) {
		return res.status(500).json({ error: "Failed to create playlist." });
	}
};
