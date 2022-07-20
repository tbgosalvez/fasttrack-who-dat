import React, { useState } from "react";
import styles from "./Option.module.css";

const Option = props => {
	const [opt, setOpt] = useState(props.default);

	const incHandler = () => {
		if(opt < props.max)
			setOpt(opt+1);
	};

	const decHandler = () => {
		if (opt > props.default)
			setOpt(opt-1);
	};

	return (
		<div className={styles.default}>
			<div className={styles.option_label}>{props.option}</div>
			<div className={styles.set_option}>
				<button className={styles.dec} onClick={decHandler}>
					-
				</button>
				<span className={styles.num_songs}>{opt}</span>
				<button className={styles.inc} onClick={incHandler}>
					+
				</button>
			</div>
		</div>
	);
};

export default Option;
