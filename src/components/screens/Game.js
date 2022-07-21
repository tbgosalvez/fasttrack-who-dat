import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Howl, Howler } from "howler";
import List from "../game/List";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import styles from "./Game.module.css";

// for testing Howler.js
import clip0 from "../../test-media/song-c.mp3";
import clip1 from "../../test-media/song-f.mp3";
import clip2 from "../../test-media/song-m.mp3";

const Game = props => {
	const history = useHistory();

	const [audio, setAudio] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [roundCount, setRoundCount] = useState(1);
	const [artists, setArtists] = useState([
		{ name: "Katy Perry", active: false },
		{ name: "Metallica", active: false },
		{ name: "Childish Gambino", active: false },
		{ name: "Miranda Lambert", active: false },
	]);
	const [songs, setSongs] = useState([
		{ name: "clip 1", src: clip0, active: false },
		{ name: "clip 2", src: clip1, active: false },
		{ name: "clip 3", src: clip2, active: false },
	]);

	useEffect(() => {
		// change to props.clips or something, passed in from Home
		let loadedSounds = [];
		songs.forEach(s => loadedSounds.push(new Howl({ src: [s.src], html5: true })));
		setAudio(loadedSounds);
		console.log("loaded audio (maybe)");
	}, []);

	const selectArtistHandler = index => {
		console.log(index, artists[index]);

		setArtists(prev => {
			let cur = [...prev];
			cur.forEach(a => (a.active = false));
			cur[index].active = true;

			return cur;
		});
	};

	const selectSongHandler = index => {
		console.log(index, artists[index]);

		setSongs(prev => {
			let cur = [...prev];
			cur.forEach(a => (a.active = false));
			cur[index].active = true;

			return cur;
		});

		audio[index].play();
	};

	const stopAudioHandler = () => Howler.stop();

	const showModalHandler = () => setShowModal(true);

	const closeModalHandler = () => {
		Howler.stop();
		setRoundCount(roundCount + 1);
		setShowModal(false);
		if (roundCount == 3) history.push("/result");
	};

	return (
		<>
			{showModal && <Modal title="You are..." message="Correct!" onClick={closeModalHandler} />}
			<Card className={`${styles.default} flex_column`}>
				<h2>Round {roundCount}</h2>
				<List title="Artist Box" data={artists} direction="row" onClick={selectArtistHandler} />
				<div className="flex_row">
					<List title="Song Box" data={songs} onClick={selectSongHandler} />
					<Button className={styles.btn_stop} onClick={stopAudioHandler}>
						⏹ Stop
					</Button>
				</div>
				<Button onClick={showModalHandler}>submit answer</Button>
			</Card>
		</>
	);
};

export default Game;
