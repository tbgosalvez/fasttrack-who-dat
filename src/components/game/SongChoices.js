import React from "react";
import Card from "../UI/Card";
import Song from "./Song";
import styles from "./SongChoices.module.css";

const SongChoices = props => {
	const songs = ["song 1", "song 2"];
	return (
		<Card className={styles.default}>
			<div>Song Box</div>

			{/* change to props */}
			<ul className="flex_column">
				{songs.map(s => {
					return (
						<li key={Math.random()}>
							<Song title={s} />
						</li>
					);
				})}
			</ul>
		</Card>
	);
};

export default SongChoices;
