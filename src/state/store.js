// deprecated apparently, but i bet lots of companies 
// who already use this don't wanna change it.
import { createStore } from "redux";
import reducer from "./reducer";

export const config_store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());