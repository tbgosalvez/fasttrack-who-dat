// deprecated apparently, but i bet lots of companies
// who already use this don't wanna change it.
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import config_reducer from "./config_reducer";
import data_reducer from "./data_reducer";
import game_reducer from "./game_reducer";
import loading_reducer from "./loading_reducer";

const rootReducer = combineReducers({
	loading: loading_reducer,
	config: config_reducer,
	data: data_reducer,
	game: game_reducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxLogger = store => next => action => {
	console.log(`\n---[Redux]---\n\nAction: `);
	console.log(action);
	console.log("State Before:");
	console.log(store.getState());
	next(action);
	console.log(`\tState After:`);
	console.log(store.getState());
	console.log("\n-------\n");
};

export const redux_store = createStore(
	rootReducer, 
	composeEnhancers(applyMiddleware(reduxLogger, thunk))
);
