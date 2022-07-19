
import React from 'react';
import Card from '../UI/Card';
import styles from "./Result.module.css";

const Result = props => {
	return (
		<Card className={styles.default}>
			You Win!
		</Card>
	);
}

export default Result;
