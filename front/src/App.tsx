import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import { StateProvider } from "./state/GlobalStateProvider";
import SignInForm from "./components/Form/SignInForm";
import { gql, useLazyQuery } from "@apollo/client";
import Header from "./components/Header/Header";

import { BackBonesUser } from "./components/types";
import SignUpForm from "./components/Form/SignUpForm";

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

	const [getUserData, { loading, error }] = useLazyQuery(GET_USER_DATA, {
		onCompleted: ({ getAuthorizedUser }) => {
			setUserData(getAuthorizedUser);
		},
		notifyOnNetworkStatusChange: true,
	});

	// check if user is logged in
	// if userId === 0, user is not logged in
	useEffect(() => {
		if (localStorage.getItem("token")) {
			(async () => {
				await getUserData();
			})();
		} else if (userId === 0) {
			setUserData(null);
		}
	}, [userId]);

	return (
		<>
			<div className="h-screen">
				{!userData && (
					<>
						<SignInForm />
						<SignUpForm />
					</>
				)}

				{userData?.projects && userData?.tasks && (
					<>
						<Header user={userData} />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route
								path="projects"
								element={
									<Projects projects={userData.projects} />
								}
							/>
							<Route
								path="tasks"
								element={<Tasks tasks={userData.tasks} />}
							/>
						</Routes>
					</>
				)}
				{loading && <div>Loading, plz wait thanks :D</div>}
				{error && <div>Oops, something went wrong :'(</div>}
			</div>
		</>
	);
}

export default App;
