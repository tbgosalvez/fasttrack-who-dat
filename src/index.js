import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import {config_store} from "./state/store";

import App from "./App";

import "./index.css";

const MOUNT_NODE = document.getElementById("app");

ReactDOM.render(
	<React.StrictMode>
		<Provider store={config_store}>
			<App />
		</Provider>
	</React.StrictMode>,
	MOUNT_NODE
);
