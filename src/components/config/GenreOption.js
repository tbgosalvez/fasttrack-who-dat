import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../../state/actions";


const GenreOption = props => {
	const state = useSelector(s => s.config);
	const dispatch = useDispatch();

	const selectGenreHandler = event => dispatch(Actions.set_genre(event.target.value));

	return (
		<div>
			Genre:
			<select value={state.genre} onChange={selectGenreHandler}>
				<option value="" />
				{state.genre_list.map(genre => (
					<option key={genre} value={genre}>
						{genre}
					</option>
				))}
			</select>
		</div>
	);
};

export default GenreOption;
