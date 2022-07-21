import React, { useState } from "react";
import CONSTANTS from "../../CONSTANTS";
import styles from "./Option.module.css";

const Option = props => {

	const incHandler = () => {
		if(props.option < props.max)
			props.onUpdate(CONSTANTS.OP_INCREMENT);
	};

	const decHandler = () => {
		if (props.option > props.default)
			props.onUpdate(CONSTANTS.OP_DECREMENT);
	};

	return (
		<div className={styles.default}>
			<div className={styles.option_label}>{props.label}</div>
			<div className={styles.set_option}>
				<button className={styles.dec} onClick={decHandler}>
					-
				</button>
				<span className={styles.num_songs}>{props.option}</span>
				<button className={styles.inc} onClick={incHandler}>
					+
				</button>
			</div>
		</div>
	);
};

export default Option;
