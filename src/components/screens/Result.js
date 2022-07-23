import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./Result.module.css";

const Result = props => {
	const history = useHistory();
	const msg = useSelector(s => s.game.result_msg);

	const rematchHandler = () => {
		// reset state here

		history.push("/");
	}

	return (
		<Card className={styles.default}>
			<div className={styles.msg}>{msg}</div>
			<Button className={styles.btn_rematch} onClick={rematchHandler}>Play Again</Button>
		</Card>
	);
};

export default Result;
