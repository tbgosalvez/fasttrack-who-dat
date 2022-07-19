
import React from 'react';
import Card from '../UI/Card';
import styles from "./Song.module.css";

const Song = props => {
	return (
		<Card className={styles.default}>
			{props.title}
		</Card>
	);
}

export default Song;
