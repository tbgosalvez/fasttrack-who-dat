import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import GenreOption from "./GenreOption";
import Option from "./Option";

import styles from "./Config.module.css";

import CONSTANTS from "../../CONSTANTS";
import Actions from "../../state/actions";

const Config = props => {
	const num_songs = useSelector(s => s.config.num_songs);
	const num_artists = useSelector(s => s.config.num_artists);
	const dispatch = useDispatch();


	const updateNumSongsHandler = op => {
		if(op == CONSTANTS.OP_INCREMENT)
			dispatch(Actions.increment_songs);
		else
			dispatch(Actions.decrement_songs);
	}

	const updateNumArtistsHandler = op => {
		if(op == CONSTANTS.OP_INCREMENT)
			dispatch(Actions.increment_artists);
		else
			dispatch(Actions.decrement_artists);
	}

	return (
		<Card className={styles.config_box}>
			<GenreOption />
			<Option option={num_songs} onUpdate={updateNumSongsHandler} label="# Songs / Round" default={1} max={3} />
			<Option option={num_artists} onUpdate={updateNumArtistsHandler} label="# Artists / Round" default={2} max={4} />
		</Card>
	);
};

export default Config;
