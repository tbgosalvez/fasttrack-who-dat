import CONSTANTS from "../CONSTANTS";

export default function game_reducer(
	state = {
		user_answer: "",
		real_answer: { name: "Metallica" },
		round: 1,
		score: 0,
		result_msg: "You Win!",
	},
	action) {
	switch(action.type) {
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
			return state;
	}
}