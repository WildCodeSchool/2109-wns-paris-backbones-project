import React, { useContext, useEffect, useState } from "react";
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
  }`;

const AuthenticationHeader = () => {
	// const [input, setInput] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userData, setUserData] = useState(null);
	const [loginSuccessful, setLoginSuccessful] = useState(false);
	// const [failedLogin, setFailedLogin] = useState(false);

	const [getToken, { data }] = useMutation(LOGIN);

	if (data) {
		localStorage.setItem("token", data.signIn);
		setLoginSuccessful(true);
	}
	const handleUserData = () => {
		const response = useQuery(GET_USER)
		setUserData(response.data.getAuthorizedUser);
		console.log('response', response);
	}

	useEffect(() => {
		handleUserData()
	}, [loginSuccessful]);

	console.log('userdata', userData);

	// if (isLoggedIn) {
	// }




	// const setLogin = () => {
	// 	console.log('login successful :)');
	// 	setLoginSuccessful(true);
	// }
	// const setLoginIssue = () => {
	// 	console.log('there was an issue :( maybe invalid email or credentials?');
	// 	setFailedLogin(true);
	// }
	const dispatch = useContext(DispatchProvider);

	return (
		<header className="App-header flex justify-center">
			<form
				className="flex flex-col"
				onSubmit={(e) => {
					e.preventDefault();
					dispatch(setUserId(email));
				}}
			>
				{/* <label htmlFor="authentication" className="text-center">
					Email
				</label>
				<input
					id="authentication"
					className="outline-none px-4 py-2 w-80"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/> */}

				{/* Email field */}

				<label htmlFor="authentication" className="text-center">
					Email
				</label>
				<input
					id="authentication"
					className="outline-none px-4 py-2 w-80"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				{/* Password field */}
				<label htmlFor="authentication" className="text-center">
					Password
				</label>
				<input
					id="authentication"
					className="outline-none px-4 py-2 w-80"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input type="submit" value="Submit" />
				{/* {loginSuccessful &&<div>LoginSuccessful! Welcome back</div>}
				{failedLogin &&<div>Invalid credentials, plz try again</div>} */}

				<button
					onClick={async () => {
						try {
							await getToken({ variables: { email: email, password: password } });
						} catch (err) {
							console.log("Handle me", err);
						}
					}}>
					Login
				</button>
			</form>

		</header>
	);
};

export default AuthenticationHeader;
