import React from "react";
import Card from "./Card";
import styles from "./Error.module.css";

const Error = props => {
	return <Card className={styles.default}>{props.children}</Card>;
};

export default Error;
