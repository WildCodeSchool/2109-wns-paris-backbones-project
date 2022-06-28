import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import { StateProvider } from "./state/GlobalStateProvider";
import SignInForm from "./components/Form/SignInForm";
import { gql, useLazyQuery } from "@apollo/client";
import Header from "./components/Header/Header";
import { BackBonesUser } from "./components/types";
import SignUpForm from "./components/Form/SignUpForm";
import Notifications from "./pages/Notications";

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
				effective_time
				estimated_time
				start_date
				end_date
				notifications {
					id
					title
					description
				}
				project {
					id
					title
					photo
					users {
						id
						firstName
						avatar
					}
					statuses {
						id
						title
					}
				}
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
			notifications {
				id
				title
				description
				read
				created_at
				project {
					id
				}
				task {
					id
				}
				user {
					id
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
				{userData?.projects &&
					userData?.tasks &&
					userData?.notifications && (
						<>
							<Header user={userData} />
							<Routes>
								<Route
									path="/"
									element={<Navigate to="/tasks" />}
								/>
								<Route
									path="projects"
									element={
										<Projects
											projects={userData.projects}
										/>
									}
								/>
								<Route
									path="tasks"
									element={<Tasks tasks={userData.tasks} />}
								/>
								<Route
									path="notifications"
									element={
										<Notifications
											notifications={
												userData.notifications
											}
										/>
									}
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
