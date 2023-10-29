import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app.components";

function Index(){
	return (
		<App />
	)
}

ReactDOM.render(<Index />, document.querySelector("#root"))
