import React from "react";
import { TasksList } from "./components/TasksList";

function App() {
	return (
		<div className="App bg-pink-700">
			<header className="App-header">
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
			<TasksList />
		</div>
	);
}

export default App;
