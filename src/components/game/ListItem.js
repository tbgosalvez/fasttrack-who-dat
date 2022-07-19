import React from "react";
import Card from "../UI/Card";
import styles from "./ListItem.module.css";

const ListItem = props => {
	const style = props.active ? "selected" : "";

	const onClickHandler = () => props.onClick(props.index)

	return <Card className={`${styles.default} ${style}`} onClick={onClickHandler}>{props.name}</Card>;
};

export default ListItem;
