import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "./slices/playlistSlice";
import playerReducer from "./slices/playerSlice";

export const store = configureStore({
	reducer: {
		playlist: playlistReducer,
		player: playerReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
