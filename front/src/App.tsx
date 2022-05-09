import React, { useContext, useMemo, useState } from "react";
import { TasksList } from "./components/TasksList/TasksList";
import { StateProvider } from "./state/GlobalStateProvider";
import SignInForm from "./components/Form/SignInForm";
import { gql, useLazyQuery } from "@apollo/client";
import Header from "./components/Header/Header";
import ProjectList from "./components/ProjectList/ProjectList";
import { BackBonesUser } from "./components/types";
import SignUpForm from "./components/Form/SignUpForm";
import { setUserId } from "./state/actions";

const GET_USER_DATA = gql`
	query GetAuthorizedUser {
		getAuthorizedUser {
			id
			firstName
			lastName
			email
			avatar
			tasks {
				id
				title
				description
				status {
					id
					title
				}
				users {
					id
					firstName
					lastName
					avatar
				}
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
	const [userData, setUserData] = useState<BackBonesUser | null>(null);
	const { userId } = useContext(StateProvider);

	const [
		getUserData,
		{ loading: loading, error: error, data: authUserData },
	] = useLazyQuery(GET_USER_DATA, {
		onCompleted: (data) => {
			if (data?.getAuthorizedUser) {
				setUserId(data.getAuthorizedUser.id);
				setUserData(data.getAuthorizedUser);
			}
		},
		onError: (err) => {
			setUserData(null);
		},
		errorPolicy: "all",
	});

	// check if user is logged in
	// if userId === 0, user is not logged in
	useMemo(() => {
		if (localStorage.getItem("token")) {
			getUserData()
				.then()
				.catch((err) => {
					console.log(err);
				});
		} else if (userId === 0) {
			setUserData(null);
		}
	}, [userId]);

	return (
		<div className="h-screen">
			{!userData && (
				<>
					<SignInForm />
					<SignUpForm />
				</>
			)}
			{userData && (
				<>
					<Header user={userData} />
					{userData.projects && (
						<ProjectList projects={userData.projects} />
					)}
					{userData.tasks && <TasksList tasks={userData.tasks} />}
				</>
			)}
			{loading && <div>Loading, plz wait thanks :D</div>}
			{error && <div>Oops, something went wrong :'(</div>}
		</div>
	);
}

export default App;
