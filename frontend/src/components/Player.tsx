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

const SeekBarContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 12px 0;
`;

const TimeDisplay = styled.span`
	color: #bbb;
	font-size: 0.9rem;
	min-width: 40px;
`;

const SeekBar = styled.input`
	width: 100%;
	appearance: none;
	background: #444;
	border-radius: 5px;
	height: 6px;
	cursor: pointer;
	&::-webkit-slider-thumb {
		appearance: none;
		width: 12px;
		height: 12px;
		background: #3b82f6;
		border-radius: 50%;
		cursor: pointer;
	}
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
};

const Player: React.FC<PlayerProps> = ({ song }) => {
	const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
	const dispatch = useDispatch();
	const [sound, setSound] = useState<Howl | null>(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

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
			onload: function () {
				setDuration(newSound.duration());
				setCurrentTime(0);
			},
		});

		setSound(newSound);
	}, [song, dispatch]);

	useEffect(() => {
		if (!sound) return;

		const updateTime = () => {
			setCurrentTime(sound.seek());
		};

		if (isPlaying) {
			const interval = setInterval(updateTime, 1000);
			return () => clearInterval(interval);
		} else {
			updateTime();
		}
	}, [sound, isPlaying]);

	useEffect(() => {
		if (sound) {
			if (isPlaying) {
				if (sound.seek() !== currentTime) {
					sound.seek(currentTime);
				}
				sound.play();
			} else {
				sound.pause();
			}
		}
	}, [isPlaying, sound]);

	const handleTogglePlay = () => {
		dispatch(togglePlayPause());
	};

	const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
		const seekTime = Number(event.target.value);
		if (sound) {
			sound.seek(seekTime);
			setCurrentTime(seekTime);
		}
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	return (
		<PlayerContainer>
			<SongImage src={song.cover} alt={song.title} />
			<SongTitle>{song.title}</SongTitle>
			<SongArtist>{song.artist}</SongArtist>

			<SeekBarContainer>
				<TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
				<SeekBar
					type="range"
					min="0"
					max={duration.toFixed(2)}
					step="0.1"
					value={currentTime}
					onChange={handleSeek}
				/>
				<TimeDisplay>{formatTime(duration)}</TimeDisplay>
			</SeekBarContainer>

			<PlayButton onClick={handleTogglePlay}>{isPlaying ? "⏸ Pause" : "▶ Play"}</PlayButton>
		</PlayerContainer>
	);
};

export default Player;
