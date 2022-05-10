import React, { useContext, useState } from "react";
import { DispatchProvider } from "../../state/GlobalStateProvider";
import { setUserId } from "../../state/actions";
import { useMutation, gql } from "@apollo/client";
import Button from "../Button/Button";

const LOGIN = gql`
	mutation SignIn($signInInput: SignInInput!) {
		signIn(signInInput: $signInInput) {
			token
			userId
		}
	}
`;

const SignInForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useContext(DispatchProvider);

	const [signIn] = useMutation(LOGIN, {
		onCompleted: (data) => {
			if (data.signIn) {
				localStorage.setItem("token", data.signIn.token);
				dispatch(setUserId(data.signIn.userId));
			}
		},
	});

	const handleSignIn = async () => {
		try {
			await signIn({
				variables: {
					signInInput: {
						email,
						password,
					},
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex justify-center py-40 App-header">
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
							onClick={async () => handleSignIn()}
							label={"Sign in"}
							state={"enabled"}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignInForm;
