import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CONSTANTS from "../../CONSTANTS";
import fetchFromSpotify from "../../services/api";
import Actions from "../../state/actions";
import Config from "../config/Config";
import Button from "../UI/Button";
import styles from "./Home.module.css";

const Home = props => {
	const history = useHistory();
	const state = useSelector(s => s);
	const dispatch = useDispatch();

	const api_search = {
		endpoint: "search",
		params: {q: `genre:${state.genre}`, type: "artist", limit: CONSTANTS.FETCH_LIMIT}
	};

	const [token, setToken] = useState("");


	const setTokenHandler = t => {
		console.log("Home::setTokenHandler", t);
		setToken(t);
	}

	const fetchDataHandler = () => {
		fetchFromSpotify({token: state.token, ...api_search})
		.then(response => {
			console.log(response)

			// TODO: randomize the slice
			const artists = response.artists.items;
			const artist_choices = artists.slice(0,state.num_artists);
			dispatch(Actions.set_artists(artists));
			dispatch(Actions.set_artist_choices(artist_choices));

			const real_answer = artists[Math.floor(Math.random() * state.num_artists)];
			dispatch(Actions.set_real_answer(real_answer));

			const artist_id = real_answer.id;
			const api_top_tracks = {
				endpoint: `artists/${artist_id}/top-tracks`,
				params: {market: "US"}
			} 

			fetchFromSpotify({token: state.token, ...api_top_tracks})
			.then(response => {
				console.log(response);
				
				const tracks = response.tracks.slice(0,state.num_songs);
				dispatch(Actions.set_track_choices(tracks));

				history.push("/game");
			});
		})
		.catch(e => console.log(e));
	}

	return (
		<div className={`${styles.default} flex_column`}>
			<Config token={token} setToken={setTokenHandler}/>
			<Button onClick={fetchDataHandler}>Play!</Button>
		</div>
	);
};

export default Home;
