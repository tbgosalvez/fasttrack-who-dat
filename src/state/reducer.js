import CONSTANTS from "../CONSTANTS";

const init_artists = ["Katy Perry", "Metallica", "Childish Gambino", "Miranda Lambert"];
const init_tracks = [
	"https://p.scdn.co/mp3-preview/c3818dcb62a5cc3701b08c3465ab93199e2786e3?cid=74f434552d40467782bc1bc64b12b2e9",
];

export default function reducer(
	state = {
		token: "",
		genre: "metal",
		num_songs: 1,
		num_artists: 2,
		artists: init_artists,
		artist_choices: [],
		tracks: init_tracks,
		track_choices: [],
		user_answer: "",
		real_answer: { name: "Metallica" },
		round: 1,
		score: 0,
		result_msg: "You Win!",
	},
	action) {
	switch (action.type) {
		case CONSTANTS.SET_TOKEN:
			return { ...state, token: action.token };

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
			return { ...state, genre: action.genre };

		case CONSTANTS.SET_ARTISTS:
			return { ...state, artists: action.array_artists };
		case CONSTANTS.SET_ARTIST_CHOICES:
			return { ...state, artist_choices: action.array_artists };
		case CONSTANTS.SET_TRACK_CHOICES:
			return { ...state, track_choices: action.array_tracks };

		case CONSTANTS.SET_REAL_ANSWER:
			return { ...state, real_answer: action.artist_name };
		case CONSTANTS.SET_USER_ANSWER:
			return { ...state, user_answer: action.user_answer };
		case CONSTANTS.INC_ROUND:
			return { ...state, round: state.round + 1 };
		case CONSTANTS.INC_SCORE:
			return { ...state, score: state.score + 1 };
		case CONSTANTS.SET_RESULT_MSG:
			return { ...state, result_msg: action.msg };

		default:
			console.log(state);
			return state;
	}
}
