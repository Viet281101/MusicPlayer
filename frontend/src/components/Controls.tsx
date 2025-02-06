import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setCurrentSong } from "../store/slices/playlistSlice";
import styled from "styled-components";

const ControlsContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 16px;
`;

const ControlButton = styled.button`
	margin: 0 8px;
	padding: 8px 12px;
	background: #444;
	border-radius: 6px;
	color: white;
	font-weight: bold;
	cursor: pointer;
	transition: background 0.2s;
	&:hover {
		background: #555;
	}
`;

const Controls: React.FC = () => {
	const dispatch = useDispatch();
	const currentSongId = useSelector((state: RootState) => state.playlist.currentSongId);
	const songs = useSelector((state: RootState) => state.playlist.songs);

	const handleNext = () => {
		if (songs.length === 0 || currentSongId === null) return;

		const currentIndex = songs.findIndex((song) => song.id === currentSongId);
		const nextIndex = (currentIndex + 1) % songs.length;
		dispatch(setCurrentSong(songs[nextIndex].id));
	};

	const handlePrevious = () => {
		if (songs.length === 0 || currentSongId === null) return;

		const currentIndex = songs.findIndex((song) => song.id === currentSongId);
		const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
		dispatch(setCurrentSong(songs[prevIndex].id));
	};

	return (
		<ControlsContainer>
			<ControlButton onClick={handlePrevious}>⏮ Prev</ControlButton>
			<ControlButton onClick={handleNext}>⏭ Next</ControlButton>
		</ControlsContainer>
	);
};

export default Controls;
