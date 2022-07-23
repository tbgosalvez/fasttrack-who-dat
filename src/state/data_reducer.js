import CONSTANTS from "../CONSTANTS";

export default function data_reducer(
	state = {
		artists: [],
		artist_choices: [],
		track_choices: []
	},
	action) {
		switch(action.type) {
			case CONSTANTS.SET_ARTISTS:
				return { ...state, artists: action.array_artists };
			case CONSTANTS.SET_ARTIST_CHOICES:
				return { ...state, artist_choices: action.array_artists };
			case CONSTANTS.SET_TRACK_CHOICES:
				return { ...state, track_choices: action.array_tracks };
	
			default:
				return state;
		}
	}