import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import List from "../game/List";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import styles from "./Game.module.css";

const Game = props => {
	const history = useHistory();
	const [showModal, setShowModal] = useState(false);
	const [roundCount, setRoundCount] = useState(1);
	const [artists, setArtists] = useState([
		{ name: "Katy Perry", active: false },
		{ name: "Metallica", active: false },
		{ name: "Childish Gambino", active: false },
	]);
	const [songs, setSongs] = useState([
		{ name: "clip 1", active: false },
		{ name: "clip 2", active: false },
	]);

	const selectArtistHandler = index => {
		console.log(index, artists[index]);

		setArtists(prev => {
			let cur = [...prev];
			cur.forEach(a => a.active = false)
			cur[index].active = true;

			return cur;
		});
	};

	const selectSongHandler = index => {
		console.log(index, artists[index]);

		setSongs(prev => {
			let cur = [...prev];
			cur.forEach(a => a.active = false)
			cur[index].active = true;

			return cur;
		});
	};

	const showModalHandler = () => setShowModal(true);

	const closeModalHandler = () => {
		setRoundCount(roundCount + 1);
		setShowModal(false);
		if(roundCount == 3)
			history.push("/result");
	};

	return (
		<>
			{showModal && <Modal title="You are..." message="Correct!" onClick={closeModalHandler} />}
			<Card className={`${styles.default} flex_column`}>
				<h2>Round {roundCount}</h2>
				<List title="Artist Box" data={artists} direction="row" onClick={selectArtistHandler} />
				<List title="Song Box" data={songs} onClick={selectSongHandler} />
				<Button onClick={showModalHandler}>That Dude/Lady/Band</Button>
			</Card>
		</>
	);
};

export default Game;
