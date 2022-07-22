import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Howl, Howler } from "howler";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../../state/actions";

import List from "../game/List";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Modal from "../UI/Modal";

import styles from "./Game.module.css";
import fetchFromSpotify from "../../services/api";
import CONSTANTS from "../../CONSTANTS";

const Game = props => {
	const history = useHistory();

	const state = useSelector(s => s);
	const dispatch = useDispatch();

	const [showModal, setShowModal] = useState(false);
	const [modalMsg, setModalMsg] = useState("Correct!");
	const [roundCount, setRoundCount] = useState(1);

	const [artists, setArtists] = useState(
		state.artist_choices.map(a => ({ name: a.name, img: a.images[1].url, active: false }))
	);

	const [audio, setAudio] = useState([]);
	const [songs, setSongs] = useState(
		state.track_choices.map((t, i) => ({ name: `clip ${i + 1}`, src: t.preview_url, img: null, active: false }))
	);

	const set_choices = () => {
		let rand_index = Math.floor(Math.random() * CONSTANTS.FETCH_LIMIT);
		let rand_start = Math.max(0, rand_index - state.num_artists);
		let artist_choices = state.artists.slice(rand_start, rand_index);
		let track_choices = [];

		dispatch(Actions.set_artist_choices(artist_choices));

		const real_answer = artist_choices[Math.floor(Math.random() * state.num_artists)];
		dispatch(Actions.set_real_answer(real_answer));

		const artist_id = real_answer.id;
		const api_top_tracks = {
			endpoint: `artists/${artist_id}/top-tracks`,
			params: { market: "US" },
		};

		fetchFromSpotify({ token: state.token, ...api_top_tracks })
			.then(response => {
				console.log(response);

				rand_index = Math.floor(Math.random() * 10); // api returns Top 10 tracks
				rand_start = Math.max(0, rand_index - state.num_songs);
				track_choices = response.tracks.slice(rand_start, rand_index);
				dispatch(Actions.set_track_choices(track_choices));

				
/*		// TODO: this doesn't work for async reasons

				setSongs(
					track_choices.map((t, i) => ({ name: `clip ${i + 1}`, src: t.preview_url, img: null, active: false }))
				);
				console.log(track_choices, songs);
				let loadedSounds = [];
				songs.forEach(s => loadedSounds.push(new Howl({ src: [s.src], html5: true })));
				setAudio(loadedSounds);
				console.log("loaded audio (maybe)");
*/			
			})
			.catch(e => console.log(e));



		setArtists(artist_choices.map(a => ({ name: a.name, img: a.images[1].url, active: false })));
	};

	useEffect(() => {
		// set_choices();
		let loadedSounds = [];
		songs.forEach(s => loadedSounds.push(new Howl({ src: [s.src], html5: true })));
		setAudio(loadedSounds);
		console.log("loaded audio (maybe)");
	}, []);

	const selectArtistHandler = index => {
		setArtists(prev => {
			let cur = [...prev];
			cur.forEach(a => (a.active = false));
			cur[index].active = true;

			return cur;
		});

		dispatch(Actions.set_user_answer(artists[index].name));
		console.log(artists[index]);
	};

	const selectSongHandler = index => {
		console.log(index, songs[index]);

		Howler.stop();

		setSongs(prev => {
			let cur = [...prev];
			cur.forEach(a => (a.active = false));
			cur[index].active = true;

			return cur;
		});

		audio[index].play();
	};

	const stopAudioHandler = () => Howler.stop();

	const submitAnswerHandler = () => {
		if (state.user_answer == state.real_answer.name) {
			setModalMsg("Correct!");
			dispatch(Actions.increment_score);
		} else {
			setModalMsg("Incorrect!");
		}

		setShowModal(true);
	};

	const closeModalHandler = () => {
		Howler.stop();
		setRoundCount(roundCount + 1);
		setShowModal(false);

		if (roundCount < 3) {
			set_choices();
			history.push("/game");
		} else {
			if (state.score == 3) dispatch(Actions.set_result_message("You Win!!!"));
			if (state.score == 2) dispatch(Actions.set_result_message("you...kind of win!!"));
			if (state.score < 2) dispatch(Actions.set_result_message("You Lose!"));

			history.push("/result");
		}
	};

	return (
		<>
			{showModal && <Modal title="You are..." message={modalMsg} onClick={closeModalHandler} />}
			<Card className={`${styles.default} flex_column`}>
				<h2>Round {roundCount}</h2>
				<List title="Artist Box" data={artists} direction="row" onClick={selectArtistHandler} />
				<div className="flex_row">
					<List title="Song Box" data={songs.filter(s => s.src !== null)} onClick={selectSongHandler} />
					<Button className={styles.btn_stop} onClick={stopAudioHandler}>
						⏹ Stop
					</Button>
				</div>
				<Button onClick={submitAnswerHandler}>submit answer</Button>
			</Card>
		</>
	);
};

export default Game;
