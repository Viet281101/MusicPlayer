import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setCurrentSong, addSong } from "../store/slices/playlistSlice";
import styled from "styled-components";

const PlaylistContainer = styled.div`
	width: 100%;
	max-width: 400px;
	background: #2d2d2d;
	padding: 16px;
	border-radius: 8px;
`;

const PlaylistTitle = styled.h2`
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 12px;
	color: white;
`;

const SongItem = styled.li<{ $isActive: boolean }>`
	padding: 8px;
	border-radius: 6px;
	cursor: pointer;
	background: ${(props) => (props.$isActive ? "#3b82f6" : "transparent")};
	color: ${(props) => (props.$isActive ? "white" : "#ccc")};
	transition: background 0.2s;
	&:hover {
		background: #444;
	}
`;

const UploadArea = styled.div`
	border: 2px dashed #ccc;
	padding: 50px 16px;
	margin-top: 10px;
	text-align: center;
	cursor: pointer;
	color: white;
	&:hover {
		background: #444;
	}
`;

const FileInput = styled.input`
	display: none;
`;

const Playlist: React.FC = () => {
	const songs = useSelector((state: RootState) => state.playlist.songs);
	const currentSongId = useSelector((state: RootState) => state.player.currentSongId);
	const dispatch = useDispatch();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleSelectSong = (id: number) => {
		dispatch(setCurrentSong(id));
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const newSong = {
				id: Date.now(),
				title: file.name.replace(".mp3", ""),
				artist: "User Upload",
				audioSrc: URL.createObjectURL(file),
				cover: "/images/default_cover.jpg",
			};
			dispatch(addSong(newSong));
		}
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		if (file) {
			const newSong = {
				id: Date.now(),
				title: file.name.replace(".mp3", ""),
				artist: "User Upload",
				audioSrc: URL.createObjectURL(file),
				cover: "/images/default_cover.jpg",
			};
			dispatch(addSong(newSong));
		}
	};

	return (
		<PlaylistContainer>
			<PlaylistTitle>📜 Playlist</PlaylistTitle>
			<ul>
				{songs.map((song) => (
					<SongItem key={song.id} $isActive={song.id === currentSongId} onClick={() => handleSelectSong(song.id)}>
						{song.title} - {song.artist}
					</SongItem>
				))}
			</ul>

			<UploadArea
				onClick={() => fileInputRef.current?.click()}
				onDragOver={(e) => e.preventDefault()}
				onDrop={handleDrop}
			>
				📂 Drag & Drop Music Files or Click to Select
				<FileInput type="file" accept="audio/mp3" ref={fileInputRef} onChange={handleFileChange} />
			</UploadArea>
		</PlaylistContainer>
	);
};

export default Playlist;
