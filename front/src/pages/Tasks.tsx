import React from "react";
import { TasksList } from "../components/Task/TasksList";
import { BackBonesUser } from "../components/types";
import { gql, useLazyQuery } from "@apollo/client";
import { useState, useEffect, useContext } from "react";
import { StateProvider } from "../state/GlobalStateProvider";

function Tasks() {
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
		<div className="h-screen ">
			{!userData && <div></div>}

			{userData && (
				<>
				{userData.tasks && <TasksList tasks={userData.tasks} />}
				</>
			)}
      {loading && <div>Loading, plz wait thanks :D</div>}
				{error && <div>Oops, something went wrong :'(</div>}
		</div>
	);
}

export default Tasks;
