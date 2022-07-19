
import React, { useState } from 'react';
import ArtistChoices from '../game/ArtistChoices';
import SongChoices from '../game/SongChoices';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Modal from '../UI/Modal';
import styles from "./Game.module.css";

const Game = props => {
	const [showModal, setShowModal] = useState(false);

	const showModalHandler = () => setShowModal(true);

	const closeModalHandler = () => setShowModal(false);

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
}

export default Game;
