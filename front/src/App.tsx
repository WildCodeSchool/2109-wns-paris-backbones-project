import React, { useContext } from "react";
import { TasksList } from "./components/TasksList/TasksList";
import { StateProvider } from "./state/GlobalStateProvider";
import AuthenticationHeader from "./components/AuthenticationHeader/AuthenticationHeader";
import { useQuery, gql } from "@apollo/client";
import { setUserId } from "./state/actions";

// Par convention, les noms de variables pour une query sont en capslock/underscores
const GET_DATA = gql`
	query GetData {
		getProjects {
			title
			id
			description
			statuses {
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
			roles {
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

	if (error) {
		console.log("BRAND NEW ERROR 2", error);
	}

	return (
		<div className="bg-pink-700 App">
			<div>
				<AuthenticationHeader />
				<h1>{userId ? userId : "toto"}</h1>
			</div>
			{loading && <div>Loading, plz wait :D</div>}
			{error && <div>Oops, something went wrong :'(</div>}
			{!loading && !error && userId && (
				<TasksList connectedUserId={userId} tasks={tasks} />
			)}
		</div>
	);
}

export default App;
