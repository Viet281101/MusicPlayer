import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { togglePlayPause } from "../store/slices/playerSlice";
import { Howl } from "howler";
import styled from "styled-components";

const PlayerContainer = styled.div`
	width: 100%;
	max-width: 400px;
	background: #2d2d2d;
	padding: 16px;
	border-radius: 8px;
	text-align: center;
	margin-top: 16px;
`;

const SongImage = styled.img`
	width: 128px;
	height: 128px;
	border-radius: 8px;
	margin-bottom: 12px;
`;

const SongTitle = styled.h2`
	font-size: 1.5rem;
	font-weight: bold;
	color: white;
`;

const SongArtist = styled.p`
	color: #ccc;
`;

const PlayButton = styled.button`
	margin-top: 12px;
	padding: 8px 16px;
	background: #3b82f6;
	border-radius: 6px;
	color: white;
	font-weight: bold;
	cursor: pointer;
	transition: background 0.2s;
	&:hover {
		background: #2563eb;
	}
`;

interface PlayerProps {
	song: {
		id: number;
		title: string;
		artist: string;
		audioSrc: string;
		cover: string;
	};
}

const Player: React.FC<PlayerProps> = ({ song }) => {
	const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
	const dispatch = useDispatch();
	const [sound, setSound] = useState<Howl | null>(null);

	useEffect(() => {
		if (sound) {
			sound.stop();
			sound.unload();
		}

		const newSound = new Howl({
			src: [song.audioSrc],
			html5: true,
			onend: () => {
				dispatch(togglePlayPause());
			},
		});
		setSound(newSound);
	}, [song, dispatch]);

	useEffect(() => {
		if (sound) {
			if (isPlaying) {
				sound.play();
			} else {
				sound.pause();
			}
		}
	}, [isPlaying, sound]);

	const handleTogglePlay = () => {
		dispatch(togglePlayPause());
	};

	return (
		<PlayerContainer>
			<SongImage src={song.cover} alt={song.title} />
			<SongTitle>{song.title}</SongTitle>
			<SongArtist>{song.artist}</SongArtist>
			<PlayButton onClick={handleTogglePlay}>{isPlaying ? "⏸ Pause" : "▶ Play"}</PlayButton>
		</PlayerContainer>
	);
};

export default Player;
