import React, { useContext, useMemo, useState } from "react";
import { DispatchProvider } from "../../state/GlobalStateProvider";
import { setUserId } from "../../state/actions";
import {
	useMutation,
	gql,
	useLazyQuery,
	useQuery,
	useApolloClient,
} from "@apollo/client";

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

	const dispatch = useContext(DispatchProvider);
	const client = useApolloClient();

	const [signIn, { loading, error }] = useMutation(LOGIN, {
		onCompleted: (data) => {
			if (data.signIn) {
				console.log("USER CONNECTED token: ", data.signIn);
				localStorage.setItem("token", data.signIn);
			}
		},
	});

	const [
		getUserData,
		{ loading: userLoading, error: userError, data: userData },
	] = useLazyQuery(GET_USER, {
		onCompleted: (data) => {
			if (data.getAuthorizedUser) {
				dispatch(setUserId(data.getAuthorizedUser.id));
				setFirstName(data.getAuthorizedUser.firstName);
			}
		},
	});

	// check if user is logged in
	useMemo(() => {
		if (localStorage.getItem("token")) {
			getUserData()
				.then()
				.catch((err) => {
					console.log(err);
				});
		}
	}, [getUserData]);

	const handleSignIn = async () => {
		try {
			await signIn({
				variables: {
					email: email,
					password: password,
				},
			});
			await getUserData();
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogout = async () => {
		try {
			localStorage.removeItem("token");
			await client.resetStore();
			dispatch(setUserId(""));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<header className="App-header flex justify-center">
			{localStorage.getItem("token") ? (
				<div className="flex justify-center">
					<h1 className="text-2xl">
						Welcome {firstName} tests are OK
					</h1>
					<button onClick={() => handleLogout()}>logout</button>
				</div>
			) : (
				<div className="flex justify-center">
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							await handleSignIn();
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
