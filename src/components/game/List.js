import React, { useState } from "react";
import Card from "../UI/Card";
import styles from "./List.module.css";
import ListItem from "./ListItem";

const List = props => {
	let style = props.direction == "row" ? "flex_row" : "flex_column"
	return (
		<Card className={`${styles.default}`}>

			{/* change to props */}
			<ul className={`${style}`}>
				{props.data.map((a, idx) => {
					return (
						<li key={Math.random()}>
							<ListItem index={idx} img={a.img} name={a.name} onClick={props.onClick} active={a.active} />
						</li>
					);
				})}
			</ul>
		</Card>
	);
};

export default List;
