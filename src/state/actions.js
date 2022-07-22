import CONSTANTS from "../CONSTANTS";

export default class Actions {
	static set_token(t) {
		return {type: CONSTANTS.SET_TOKEN, token: t};
	}

	static increment_songs = { type: CONSTANTS.INCREMENT_SONGS };
	static decrement_songs = { type: CONSTANTS.DECREMENT_SONGS };
	static increment_artists = { type: CONSTANTS.INCREMENT_ARTISTS };
	static decrement_artists = { type: CONSTANTS.DECREMENT_ARTISTS };
	
	static set_genre(g) {
		return { type: CONSTANTS.SET_GENRE, genre: g };
	}


	static set_artists(arr_a) {
		return { type: CONSTANTS.SET_ARTISTS, array_artists: arr_a};
	}

	static set_artist_choices(arr_a) {
		return { type: CONSTANTS.SET_ARTIST_CHOICES, array_artists: arr_a};
	}

	static set_track_choices(arr_t) {
		return { type: CONSTANTS.SET_TRACK_CHOICES, array_tracks: arr_t};
	}

	static set_real_answer(a) {
		return {type: CONSTANTS.SET_REAL_ANSWER, artist_name: a};
	}

	static set_user_answer(a) {
		return { type: CONSTANTS.SET_USER_ANSWER, user_answer: a};
	}

	static increment_round = { type: CONSTANTS.INC_ROUND };
	static increment_score = { type: CONSTANTS.INC_SCORE };

	static set_result_message(m){
		return {type: CONSTANTS.SET_RESULT_MSG, msg: m};
	} 
}
