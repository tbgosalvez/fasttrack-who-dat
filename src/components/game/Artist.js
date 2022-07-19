
import React from 'react';
import Card from '../UI/Card';
import styles from "./Artist.module.css";

const Artist = props => {
	return (
		<Card className={styles.default}>
			{props.name}
		</Card>
	);
}

export default Artist;
