import React from 'react';
import Card from "../UI/Card";
import styles from "./Config.module.css";
import GenreOption from "./GenreOption";
import Option from "./Option";

const Config = props => {
	return (
		<Card className={styles.config_box}>
			<GenreOption />
			<Option option="# Songs / Round" default={1} max={3} />
			<Option option="# Artists / Round" default={2} max={4} />
		</Card>
	);
}

export default Config;
