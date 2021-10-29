import React, { useContext } from "react";
import { TasksList } from "./components/TasksList";
import { StateProvider } from "./state/GlobalStateProvider";
import AuthenticationHeader from "./components/AuthenticationHeader";

function App() {
	const { userId } = useContext(StateProvider);
	return (
		<div className="App bg-pink-700">
			<AuthenticationHeader />
			<TasksList />
		</div>
	);
}

export default App;
