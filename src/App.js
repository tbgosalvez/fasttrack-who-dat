import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/screens/Home";
import Game from "./components/screens/Game";
import Result from "./components/screens/Result";

const App = () => (
	<div>
		<BrowserRouter>
			<Switch>
				<Route exact path="/who-dat" component={Home} />
				<Route exact path="/game" component={Game} />
				<Route exact path="/result" component={Result} />
			</Switch>
		</BrowserRouter>
	</div>
);

export default App;
