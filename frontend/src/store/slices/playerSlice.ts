import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
	currentSongId: number | null;
	isPlaying: boolean;
};

const initialState: PlayerState = {
	currentSongId: null,
	isPlaying: false,
};

const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		setCurrentSong: (state, action: PayloadAction<number>) => {
			state.currentSongId = action.payload;
			state.isPlaying = true;
		},
		togglePlayPause: (state) => {
			state.isPlaying = !state.isPlaying;
		},
		stopSong: (state) => {
			state.isPlaying = false;
		},
	},
});

export const { setCurrentSong, togglePlayPause, stopSong } = playerSlice.actions;
export default playerSlice.reducer;
