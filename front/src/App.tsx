import React, { useContext, useEffect } from "react";
import { TasksList } from "./components/TasksList/TasksList";
import { StateProvider } from "./state/GlobalStateProvider";
import AuthenticationHeader from "./components/AuthenticationHeader/AuthenticationHeader";
import { useQuery, gql } from "@apollo/client";

// Par convention, les noms de variables pour une query sont en capslock/underscores
const GET_DATA = gql`
	query GetData {
		getProjects {
			title
			id
			description
			status {
				title
			}
			tasks {
				id
			}
			users {
				id
			}
		}
		getTasks {
			id
			title
			description
			effective_time
			estimated_time
			start_date
			end_date
			status {
				title
			}
			users {
				id
			}
			project {
				id
			}
		}
		getUsers {
			id
			firstName
			projects {
				id
			}
			tasks {
				id
			}
			lastName
			email
			avatar
			password
			role {
				title
			}
		}
	}
`;

function App() {
	const { userId } = useContext(StateProvider);
	const { loading, error, data } = useQuery(GET_DATA);
	const {
		getProjects: projects,
		getUsers: users,
		getTasks: tasks,
	} = data ?? {};
	useEffect(() => console.log(data));

	return (
		<div className="App bg-pink-700">
			<AuthenticationHeader />
			<TasksList connectedUserId={userId} />
		</div>
	);
}

export default App;
