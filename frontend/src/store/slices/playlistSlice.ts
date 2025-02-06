import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Song {
	id: number;
	title: string;
	artist: string;
	audioSrc: string;
	cover: string;
};

interface PlaylistState {
	songs: Song[];
	currentSongId: number | null;
};

const initialState: PlaylistState = {
	songs: [],
	currentSongId: null,
};

const playlistSlice = createSlice({
	name: "playlist",
	initialState,
	reducers: {
		setCurrentSong: (state, action: PayloadAction<number>) => {
			state.currentSongId = action.payload;
		},
		addSong: (state, action: PayloadAction<Song>) => {
			state.songs.push(action.payload);
		},
		removeSong: (state, action: PayloadAction<number>) => {
			state.songs = state.songs.filter((song) => song.id !== action.payload);
		},
		addUserSong: (state, action: PayloadAction<{ file: File }>) => {
			const { file } = action.payload;
			const newSong: Song = {
				id: state.songs.length + 1,
				title: file.name.replace(".mp3", ""),
				artist: "User Upload",
				audioSrc: URL.createObjectURL(file),
				cover: "/images/default_cover.jpg",
			};
			state.songs.push(newSong);
		},
	},
});

export const { setCurrentSong, addSong, removeSong, addUserSong } = playlistSlice.actions;
export default playlistSlice.reducer;
