import CONSTANTS from "../CONSTANTS";


export default function config_reducer(
	state = {
		token: "",
		genre_list: [""],
		genre: "metal",
		num_songs: 1,
		num_artists: 2,
	},
	action) {
	switch (action.type) {
		case CONSTANTS.SET_TOKEN:
			return { ...state, token: action.token };
		case CONSTANTS.SET_GENRE_LIST:
			return { ...state, genre_list: action.array_genres };
		case CONSTANTS.SET_GENRE:
			return { ...state, genre: action.genre };
	
		case CONSTANTS.INCREMENT_SONGS:
			return { ...state, num_songs: state.num_songs + 1 };
		case CONSTANTS.DECREMENT_SONGS:
			return { ...state, num_songs: state.num_songs - 1 };
		case CONSTANTS.INCREMENT_ARTISTS:
			return { ...state, num_artists: state.num_artists + 1 };
		case CONSTANTS.DECREMENT_ARTISTS:
			return { ...state, num_artists: state.num_artists - 1 };

		default:
			return state;
	}
}
