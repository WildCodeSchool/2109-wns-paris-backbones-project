import React, { useContext, useMemo, useState } from "react";
import { DispatchProvider } from "../../state/GlobalStateProvider";
import { setUserId } from "../../state/actions";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import Button from "../Button/Button";

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

	const dispatch = useContext(DispatchProvider);

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

	return (
		<div className="flex justify-center py-40 App-header">
			{!userData && (
				<div className="w-full max-w-xs ">
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							await handleSignIn();
						}}
						className="px-8 pt-6 pb-8 mb-4 rounded shadow-md bg-light-dark dark:bg-dark-medium"
					>
						<div className="mb-4">
							<h1 className="text-xl font-main-bold text-center">
								Connexion
							</h1>
							<label className="block mb-2 text-sm font-main-bold">
								Email
							</label>
							<input hidden type="text" autoComplete="username" />
							<input
								className="w-full px-3 py-2 leading-tight rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:text-dark-dark"
								type="mail"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="mb-6">
							<label className="block mb-2 text-sm font-bold">
								Password
							</label>
							<input
								className="w-full px-3 py-2 mb-3 text-dark-dark leading-tight border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								type="password"
								placeholder="***********"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="flex items-center justify-between">
							<Button
								onClick={handleSignIn}
								label={"Sign in"}
								state={"enabled"}
							/>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Form;
