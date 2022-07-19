import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/screens/Home";
import Game from "./components/screens/Game";

const App = () => (
	<div>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/game" component={Game} />
			</Switch>
		</BrowserRouter>
	</div>
);

export default App;
