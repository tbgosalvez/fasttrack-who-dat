export default class CONSTANTS {
	static OP_INCREMENT = "+";
	static OP_DECREMENT = "-"; // not necessary with current logic but good practice

	// action types -> reducer switch & dispatch actions
	static INCREMENT_SONGS = "INC_SONGS_OPTION";
	static DECREMENT_SONGS = "DEC_SONGS_OPTION";

	static INCREMENT_ARTISTS = "INC_ARTISTS_OPTION";
	static DECREMENT_ARTISTS = "DEC_ARTISTS_OPTION";

	static SET_GENRE = "SET_GENRE_OPTION";
}
