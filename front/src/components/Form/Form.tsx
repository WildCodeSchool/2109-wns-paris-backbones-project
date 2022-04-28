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

const Form = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");

	const dispatch = useContext(DispatchProvider);
	const client = useApolloClient();

	const [signIn, { loading, error }] = useMutation(LOGIN, {
		onCompleted: (data) => {
			if (data.signIn) {
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
			getUserData();
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
		<header className="flex justify-center App-header">
			{localStorage.getItem("token") ? (
				<div className="flex flex-col justify-center">
					<h1 className="text-2xl text-white">Welcome {firstName}</h1>

					<button
						className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
						type="submit"
						onClick={() => handleLogout()}
					>
						LogOut
					</button>
				</div>
			) : (
				<div className="w-full max-w-xs">
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							await handleSignIn();
						}}
						className="px-8 pt-6 pb-8 mb-4 rounded shadow-md bg-slate-700"
					>
						<div className="mb-4">
							<h1 className="text-xl font-semibold text-center text-white">
								Connexion
							</h1>
							<label className="block mb-2 text-sm font-bold text-green-200">
								Email
							</label>
							<input
								className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								type="mail"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="mb-6">
							<label className="block mb-2 text-sm font-bold text-green-200">
								Password
							</label>
							<input
								className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								type="password"
								placeholder="***********"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="flex items-center justify-between">
							<button
								className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
								type="submit"
							>
								Sign In
							</button>
						</div>
					</form>
				</div>
			)}
		</header>
	);
};

export default Form;
