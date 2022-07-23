import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../UI/Card";
import styles from "./List.module.css";
import ListItem from "./ListItem";

const List = props => {
	const game = useSelector(s => s.game);
	const [selection, setSelection] = useState(Array(4).fill(0));

	let style = props.direction == "row" ? "flex_row" : "flex_column"

	useEffect(() => setSelection(Array(4).fill(0)),[game.round]);

	const selectionHandler = index => {
		const s = Array(4).fill(0);
		s[index] = true;
		setSelection(s);

		props.onClick(index);
	}

	return (
		<Card className={`${styles.default}`}>

			{/* change to props */}
			<ul className={`${style}`}>
				{props.data.map((a, idx) => {
					return (
						<li key={Math.random()}>
							<ListItem index={idx} img={a.img} name={a.name} onClick={selectionHandler} active={selection[idx]==true} />
						</li>
					);
				})}
			</ul>
		</Card>
	);
};

export default List;
