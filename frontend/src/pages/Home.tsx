import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Playlist from "../components/Playlist";
import Player from "../components/Player";
import Controls from "../components/Controls";
import styled from "styled-components";

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	background: #121212;
	color: white;
	padding: 20px;
`;

const Title = styled.h1`
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 20px;
	color: #f5f5f5;
`;

const Home: React.FC = () => {
	const currentSongId = useSelector((state: RootState) => state.playlist.currentSongId);
	const songs = useSelector((state: RootState) => state.playlist.songs);
	const currentSong = songs.find((song) => song.id === currentSongId);

	return (
		<HomeContainer>
			<Title>🎵 Music Player</Title>

			<Playlist />

			{currentSong && (
				<>
					<Player song={currentSong} />
					<Controls />
				</>
			)}
		</HomeContainer>
	);
};

export default Home;
