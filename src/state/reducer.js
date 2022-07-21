import CONSTANTS from "../CONSTANTS";

export default function config_reducer(state = { genre: "pop", num_songs: 1, num_artists: 2 }, action) {
	switch (action.type) {
		case CONSTANTS.INCREMENT_SONGS:
			return { ...state, num_songs: state.num_songs + 1 };
		case CONSTANTS.DECREMENT_SONGS:
			return { ...state, num_songs: state.num_songs - 1 };
		case CONSTANTS.INCREMENT_ARTISTS:
			return { ...state, num_artists: state.num_artists + 1 };
		case CONSTANTS.DECREMENT_ARTISTS:
			return { ...state, num_artists: state.num_artists - 1 };
		case CONSTANTS.SET_GENRE:
			console.log("reducer::set_genre", action.genre);
			return { ...state, genre: action.genre};
		default:
			return state;
	}
}
