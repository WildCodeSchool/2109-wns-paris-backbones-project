import React, { useContext } from "react";
import { TasksList } from "./components/TasksList/TasksList";
import { StateProvider } from "./state/GlobalStateProvider";
import AuthenticationHeader from "./components/AuthenticationHeader/AuthenticationHeader";
import { ProjectList } from "./components/ProjectList/ProjectList"

function App() {
	const { userId } = useContext(StateProvider);
	return (
		<div className="App bg-pink-700">
			<AuthenticationHeader />
			<TasksList connectedUserId={userId} />
			<ProjectList connectedUserId={userId} />

		</div>
	);
}

export default App;
