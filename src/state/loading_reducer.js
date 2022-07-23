import CONSTANTS from "../CONSTANTS";

export default function loading_reducer(
	state = {
		loading_token: true,
		loading_artists: true,
		loading_songs: true,
		error_msg: ""
	},
	action) {
	switch(action.type) {
		case CONSTANTS.SET_LOADED_TOKEN_SUCCESS:
			return {...state, loading_token: false};
		case CONSTANTS.SET_LOADED_ARTISTS_SUCCESS:
			return {...state, loading_artists: false};
		case CONSTANTS.SET_LOADED_SONGS_SUCCESS:
			return {...state, loading_songs: false};
		case CONSTANTS.SET_LOADED_SONGS_FAIL:
			return {...state, error_msg: action.msg};
		default:
			return state;
	}
}