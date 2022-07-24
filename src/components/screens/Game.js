import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Howl, Howler } from "howler";
import { useDispatch, useSelector } from "react-redux";

import List from "../game/List";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import Loading from "../UI/Loading";
import Error from "../UI/Error";

import styles from "./Game.module.css";

import Actions from "../../state/actions";

const Game = props => {
	const history = useHistory();

	// these -> re-render
	const loading = useSelector(s => s.loading);
	const data = useSelector(s => s.data);
	const game = useSelector(s => s.game);
	const dispatch = useDispatch();

	const [showModal, setShowModal] = useState(false);
	const [modalMsg, setModalMsg] = useState("Correct!");


	// these -> assigned with each re-render, but don't cause re-renders themselves
	const artists = data.artist_choices.map(a => ({ name: a.name, img: a.images[1].url}))
	const songs = data.track_choices.map((t, i) => ({ name: `clip ${i + 1}`, src: t.preview_url, img: null}))

	const audio = [];
	songs.forEach(s => audio.push(new Howl({ src: [s.src], html5: true })));
	console.log("loaded audio (maybe)");


	// the infamous useEffect()
	useEffect(() => {
		console.log("Game::useEffect");
		dispatch(Actions.load_choices_async);
	},[loading.loading_artists]);


	// callbacks
	const selectArtistHandler = index => {
		dispatch(Actions.set_user_answer(artists[index].name));
		console.log(artists[index]);
	};

	const selectSongHandler = index => {
		Howler.stop();
		audio[index].play();
		console.log(index, songs[index]);
	};

	const stopAudioHandler = () => Howler.stop();

	const submitAnswerHandler = () => {
		if (game.user_answer == game.real_answer.name) {
			setModalMsg("Correct!");
			dispatch(Actions.increment_score);
		} else {
			setModalMsg("Incorrect!");
		}

		setShowModal(true);
	};

	const closeModalHandler = () => {
		Howler.stop();
		dispatch(Actions.increment_round);
		setShowModal(false);

		if (game.round < 3) {
			dispatch(Actions.load_choices_async);
			history.push("/game");
		} else {
			if (game.score == 3) dispatch(Actions.set_result_message("You Win!!!"));
			if (game.score == 2) dispatch(Actions.set_result_message("you...kind of win!!"));
			if (game.score < 2) dispatch(Actions.set_result_message("You Lose!"));

			history.push("/result");
		}
	};


	// render
	if(loading.loading_songs)
		return <Loading />;


	return (
		<>
			{showModal && <Modal title="You are..." message={modalMsg} onClick={closeModalHandler} />}
			<Card className={`${styles.default} flex_column`}>
				<h2>Round {game.round}</h2>
					<List title="Artist Box" data={artists} direction="row" onClick={selectArtistHandler} />
					<div className="flex_row">
			 			<List title="Song Box" data={songs.filter(s => s.src !== null)} onClick={selectSongHandler} />
			 			<Button className={styles.btn_stop} onClick={stopAudioHandler}>
			 				⏹ Stop
			 			</Button>
			 		</div>
				<Button onClick={submitAnswerHandler}>submit answer</Button>
			</Card>
			{loading.error_msg && <Error>{loading.error_msg}</Error>}
		</>
	);
};

export default Game;
