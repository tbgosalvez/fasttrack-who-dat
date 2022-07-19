import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ArtistChoices from "../game/ArtistChoices";
import SongChoices from "../game/SongChoices";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import styles from "./Game.module.css";

const Game = props => {
	const [showModal, setShowModal] = useState(false);
	const [roundCount, setRoundCount] = useState(1);
	const history = useHistory();

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
			<Card className={styles.default}>
				<ArtistChoices />
				<SongChoices />
				<Button onClick={showModalHandler}>That Dude/Lady/Band</Button>
			</Card>
		</>
	);
};

export default Game;
