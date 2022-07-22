import React from "react";
import { useSelector } from "react-redux";
import Card from "../UI/Card";
import styles from "./Result.module.css";

const Result = props => {
	const msg = useSelector(s => s.result_msg);

	return (
		<Card className={styles.default}>
			<div className={styles.msg}>{msg}</div>
		</Card>
	);
};

export default Result;
