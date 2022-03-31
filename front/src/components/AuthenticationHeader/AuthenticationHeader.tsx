import React, { useContext, useState } from "react";
import { DispatchProvider } from "../../state/GlobalStateProvider";
import { setUserId } from "../../state/actions";

import { useMutation, useQuery, gql } from "@apollo/client";

const LOGIN = gql`
	mutation SignIn($password: String!, $email: String!) {
		signIn(password: $password, email: $email)
	}
`;

const GET_USER = gql`
	query GetAuthorizedUser {
		getAuthorizedUser {
			firstName
			id
		}
	}
`;

const AuthenticationHeader = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [getToken, { data }] = useMutation(LOGIN);
	if (data) {
		console.log(data);
		localStorage.setItem("token", data.signIn);
	}
	const { data: userData } = useQuery(GET_USER);
	const dispatch = useContext(DispatchProvider);

	return (
		<header className="App-header flex justify-center">
			{userData && userData.getAuthorizedUser ? (
				<div className="flex justify-center">
					<h1 className="text-2xl">
						Welcome {userData.getAuthorizedUser.firstName}
					</h1>
				</div>
			) : (
				<div className="flex justify-center">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							getToken({
								variables: {
									email,
									password,
								},
							})
								.then((r) => {
									console.log(r);
									dispatch(setUserId(r.data.signIn));
								})
								.catch((e) => {
									console.log(e);
								});
						}}
					>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button type="submit">Login</button>
					</form>
				</div>
			)}
		</header>
	);
};

export default AuthenticationHeader;
