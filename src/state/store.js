// deprecated apparently, but i bet lots of companies 
// who already use this don't wanna change it.
import { createStore } from "redux";
import config_reducer from "./reducer";

export const config_store = createStore(config_reducer);