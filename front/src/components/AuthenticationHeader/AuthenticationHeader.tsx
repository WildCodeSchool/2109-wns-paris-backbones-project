import React, { useContext, useMemo, useState } from "react";
import { DispatchProvider } from "../../state/GlobalStateProvider";
import { setUserId } from "../../state/actions";
import { useMutation, gql, useLazyQuery, useQuery } from "@apollo/client";

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
	const [firstName, setFirstName] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const dispatch = useContext(DispatchProvider);

	// sign in
	const [signIn, { loading, error }] = useMutation(LOGIN, {
		onCompleted: (data) => {
			if (data.signIn) {
				console.log("sign in success");
				localStorage.setItem("token", data.signIn);
			}
		},
	});

	// check if user is logged in
	const [
		getUserData,
		{ loading: userLoading, error: userError, data: userData },
	] = useLazyQuery(GET_USER, {
		onCompleted: (data) => {
			if (data.getAuthorizedUser) {
				console.log("user is logged in");
				dispatch(setUserId(data.getAuthorizedUser.id));
				setFirstName(data.getAuthorizedUser.firstName);
				setIsLoggedIn(true);
			}
		},
	});

	const { data: userDataTest } = useQuery(GET_USER, {
		onCompleted: (data) => {
			if (data.getAuthorizedUser) {
				console.log("user is logged in");
				dispatch(setUserId(data.getAuthorizedUser.id));
				setFirstName(data.getAuthorizedUser.firstName);
				setIsLoggedIn(true);
			}
		},
	});

	const handleLogout = () => {
		localStorage.removeItem("token");
		dispatch(setUserId(""));
		setIsLoggedIn(false);
	};

	return (
		<header className="App-header flex justify-center">
			{isLoggedIn ? (
				<div className="flex justify-center">
					<h1 className="text-2xl">Welcome {firstName}</h1>
					<button onClick={() => handleLogout()}>logout</button>
				</div>
			) : (
				<div className="flex justify-center">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							signIn({
								variables: {
									email,
									password,
								},
							})
								.then((r) => {
									getUserData().then((r) => {
										console.log(r);
									});
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
