import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import fetchFromSpotify from "../../services/api";
import Config from "../config/Config";
import Button from "../UI/Button";
import styles from "./Home.module.css";

const Home = props => {
	const history = useHistory();
	const api_search = {
		endpoint: "search",
		params: {q: "summer", type: "track", genre: "pop", limit: 3}
	};

	const [token, setToken] = useState("");


	const setTokenHandler = t => {
		console.log("Home::setTokenHandler", t);
		setToken(t);
	}

	const fetchDataHandler = () => {
		fetchFromSpotify({token, ...api_search})
		.then(response => {
			console.log(response)

			const artist_id = response.tracks.items[0].artists[0].id;
			const api_top_tracks = {
				endpoint: `artists/${artist_id}/top-tracks`,
				params: {market: "US"}
			} 

			fetchFromSpotify({token, ...api_top_tracks})
			.then(response => {
				console.log(response);
				
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
