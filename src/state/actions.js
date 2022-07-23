import CONSTANTS from "../CONSTANTS";
import fetchFromSpotify, { request } from "../services/api";
import lodash from "lodash";

const AUTH_ENDPOINT = "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

export default class Actions {
	// Asynchronous function creators
	static load_token_async(dispatch) {
		return fetchToken(dispatch);
	}

	static load_artists_async(dispatch, getState) {
		return fetchArtists(dispatch, getState);
	}

	static load_choices_async(dispatch, getState) {
		return selectArtists_fetchSongs(dispatch, getState);
	}		


	// Synchronous Stuff
	static set_token(t) {
		return {type: CONSTANTS.SET_TOKEN, token: t};
	}

	static increment_songs = { type: CONSTANTS.INCREMENT_SONGS };
	static decrement_songs = { type: CONSTANTS.DECREMENT_SONGS };
	static increment_artists = { type: CONSTANTS.INCREMENT_ARTISTS };
	static decrement_artists = { type: CONSTANTS.DECREMENT_ARTISTS };
	
	static set_genre_list(g) {
		return { type: CONSTANTS.SET_GENRE_LIST, array_genres: g};
	}

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

const fetchToken = dispatch => {
	const storedTokenString = localStorage.getItem(TOKEN_KEY);

	if (storedTokenString) {
		const storedToken = JSON.parse(storedTokenString);
		if (storedToken.expiration > Date.now()) {
			console.log("Token found in localstorage");
			dispatch(Actions.set_token(storedToken.value));
			dispatch({type: CONSTANTS.SET_LOADED_TOKEN_SUCCESS});
			loadGenres(storedToken.value)
				.then(response => dispatch(Actions.set_genre_list(response.genres)));
			return;
		}
	}

	console.log("Sending request to AWS endpoint");

	request(AUTH_ENDPOINT)
		.then(({ access_token, expires_in }) => {
			const newToken = {
				value: access_token,
				expiration: Date.now() + (expires_in - 20) * 1000,
			};
			localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
			dispatch(Actions.set_token(newToken.value));
			dispatch({type: CONSTANTS.SET_LOADED_TOKEN_SUCCESS});
			
			loadGenres(newToken.value)
				.then(response => dispatch(Actions.set_genre_list(response.genres)));
		})
		.catch(e => dispatch({type: CONSTANTS.SET_LOADED_TOKEN_FAIL, msg: e}));
}

const loadGenres = async t => {
	const response = await fetchFromSpotify({
		token: t,
		endpoint: "recommendations/available-genre-seeds",
	});

	console.log(response);

	return response;
};

const fetchArtists = (dispatch, getState) => {
	const state = getState(); // just to avoid typing all the parentheses down below

	const api_search = {
		endpoint: "search",
		params: {q: `genre:${state.config.genre}`, type: "artist", limit: CONSTANTS.FETCH_LIMIT}
	};


	fetchFromSpotify({token: state.config.token, ...api_search})
	.then(response => {
		console.log(response)

		const artists = response.artists.items;
		dispatch(Actions.set_artists(artists));
		dispatch({type: CONSTANTS.SET_LOADED_ARTISTS_SUCCESS});
	})
	.catch(e => dispatch({type: CONSTANTS.SET_LOADED_ARTISTS_FAIL, msg: e.toString()}));	
}

const selectArtists_fetchSongs = (dispatch, getState) => {
	const state = getState();

	if(state.data.artists.length < 1)
		return;

	let rand_index = lodash.random(state.config.num_artists,CONSTANTS.FETCH_LIMIT)
	let rand_start = Math.max(0, rand_index - state.config.num_artists);
	
	console.log(rand_start, rand_index);
	
	let artist_choices = state.data.artists.slice(rand_start, rand_index);


	dispatch(Actions.set_artist_choices(artist_choices));

	const real_answer = artist_choices[lodash.random(0,state.config.num_artists-1)];
	dispatch(Actions.set_real_answer(real_answer));

	const artist_id = real_answer.id;
	const api_top_tracks = {
		endpoint: `artists/${artist_id}/top-tracks`,
		params: { market: "US" },
	};

	fetchFromSpotify({ token: state.config.token, ...api_top_tracks })
		.then(response => {
			console.log(response);

			rand_index = Math.floor(Math.random() * 10); // api returns Top 10 tracks
			rand_start = Math.max(0, rand_index - state.config.num_songs);
			
			const track_choices = response.tracks.slice(rand_start, rand_index);
			dispatch(Actions.set_track_choices(track_choices));
			dispatch({type: CONSTANTS.SET_LOADED_SONGS_SUCCESS});
		})
		.catch(e => dispatch({type: CONSTANTS.SET_LOADED_SONGS_FAIL, msg: e.toString()}));
}