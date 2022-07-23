import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Actions from "../../state/actions";
import Config from "../config/Config";
import Button from "../UI/Button";
import Loading from "../UI/Loading";
import styles from "./Home.module.css";

const Home = props => {
	const history = useHistory();
	const state = useSelector(s => s);
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(Actions.load_token_async);
	},[]);

	const fetchDataHandler = () => {
		dispatch(Actions.load_artists_async);
		history.push("/game");
	}

	if(state.loading.loading_token)
		return <Loading />;

	return (
		<div className={`${styles.default} flex_column`}>
			<Config />
			<Button className={styles.btn_play} onClick={fetchDataHandler}>Play!</Button>
		</div>
	);
};

export default Home;
