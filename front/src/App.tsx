import React, { useContext, useEffect } from "react";
import { TasksList } from "./components/TasksList/TasksList";
import { StateProvider } from "./state/GlobalStateProvider";
import Form from "./components/Form/Form";
import { gql, useLazyQuery } from "@apollo/client";
import Header from "./components/Header/Header";
import ProjectList from "./components/ProjectList/ProjectList";
import { BackBonesUser } from "./components/types";

const GET_USER_DATA = gql`
	query GetUserById($userId: Float!) {
		getUserById(userId: $userId) {
			id
			firstName
			lastName
			email
			avatar
			tasks {
				id
				title
			}
			projects {
				id
				title
				description
				photo
				start_date
				end_date
				tasks {
					id
					title
					description
					start_date
					end_date
					status {
						id
						title
					}
					project {
						id
						title
						photo
					}
				}
				users {
					id
					firstName
					lastName
					email
					avatar
				}
			}
		}
	}
`;

function App() {
	const [userData, setUserData] = React.useState<BackBonesUser | null>(null);
	const { userId } = useContext(StateProvider);

	const [getUserData, { loading, error, data }] = useLazyQuery(
		GET_USER_DATA,
		{
			variables: { userId },
		}
	);

	useEffect(() => {
		if (userId) {
			getUserData()
				.then(({ data }) => {
					setUserData(data.getUserById);
				})
				.catch((error) => {
					console.log("Fetching User Data Error", error);
				});
		}
	}, [userId]);

	return (
		<div className="h-screen ">
			<Header />
			<div>
				<Form />
			</div>
			{loading && <div>Loading, plz wait :D</div>}
			{error && <div>Oops, something went wrong :'(</div>}
			{!loading && !error && userData?.projects && (
				//<TasksList connectedUserId={userId} tasks={tasks} />
				<>
					<ProjectList projects={userData.projects} />
					<TasksList tasks={userData.tasks} />
				</>
			)}
		</div>
	);
}

export default App;
