import CONSTANTS from "../CONSTANTS";

export default class Actions {
	static increment_songs = { type: CONSTANTS.INCREMENT_SONGS };
	static decrement_songs = { type: CONSTANTS.DECREMENT_SONGS };
	static increment_artists = { type: CONSTANTS.INCREMENT_ARTISTS };
	static decrement_artists = { type: CONSTANTS.DECREMENT_ARTISTS };
	static set_genre(g) {
		return { type: CONSTANTS.SET_GENRE, genre: g };
	}
}
