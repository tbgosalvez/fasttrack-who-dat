import React from "react";
import { Link } from "react-router-dom";
import Config from "../config/Config";
import Button from "../UI/Button";
import styles from "./Home.module.css";

const Home = props => {
	return (
		<div className={`${styles.default} flex_column`}>
			<Config />
			<Link to="/game">
				<Button>Play!</Button>
			</Link>
		</div>
	);
};

export default Home;
