import React, { useState } from "react";
import Card from "../UI/Card";
import styles from "./Config.module.css";
import GenreOption from "./GenreOption";
import Option from "./Option";

const Config = props => {
	const [token, setToken] = useState(props.token);

	const setTokenHandler = t => {
		setToken(t);
		props.setToken(t);
	}

	return (
		<Card className={styles.config_box}>
			<GenreOption setToken={setTokenHandler} token={token} />
			<Option option="# Songs / Round" default={1} max={3} />
			<Option option="# Artists / Round" default={2} max={4} />
		</Card>
	);
};

export default Config;
