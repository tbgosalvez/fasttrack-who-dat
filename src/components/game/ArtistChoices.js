import React from "react";
import Card from "../UI/Card";
import Artist from "./Artist";
import styles from "./ArtistChoices.module.css";

const ArtistChoices = props => {
	const artists = ["Katy Perry", "Metallica", "NeYo"];

	return (
		<Card className={styles.default}>
			<div>Artist Box</div>

			{/* change to props */}
			<ul>
				{artists.map(a => {
					return(
						<li key={Math.random()}>
							<Artist name={a} />
						</li>
					);
				})}
			</ul>
		</Card>
	);
};

export default ArtistChoices;
