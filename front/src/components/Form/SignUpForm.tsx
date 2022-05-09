import React, { useContext, useState } from "react";
import Button from "../Button/Button";
import { gql, useMutation } from "@apollo/client";
import { setUserId } from "../../state/actions";
import { DispatchProvider } from "../../state/GlobalStateProvider";

const CREATE_USER = gql`
	mutation SignUp($signUpInput: SignUpInput!) {
		signUp(SignUpInput: $signUpInput) {
			token
			userId
		}
	}
`;

const SignUpForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [avatar, setAvatar] = useState("");

	const dispatch = useContext(DispatchProvider);

	const isEmailValid = (email: string) => {
		const emailRegex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return emailRegex.test(email);
	};

	const [signUp, { loading, error }] = useMutation(CREATE_USER, {
		onCompleted: (data) => {
			if (data.signUp) {
				localStorage.setItem("token", data.signUp.token);
				dispatch(setUserId(data.signUp.userId));
			}
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const handleSignUp = async () => {
		if (isEmailValid(email) && password === confirmPassword) {
			try {
				await signUp({
					variables: {
						signUpInput: {
							email,
							password,
							firstName,
							lastName,
							avatar,
						},
					},
				});
			} catch (err) {
				console.log(err);
			}
		} else {
			alert("Please check your email and password");
		}
	};

	return (
		<div className="flex justify-center py-40 App-header">
			<div className="w-full max-w-xs ">
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						await handleSignUp();
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
					<div className="mb-6">
						<label className="block mb-2 text-sm font-bold">
							Confirm Password
						</label>
						<input
							className="w-full px-3 py-2 mb-3 text-dark-dark leading-tight border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							type="password"
							placeholder="***********"
							autoComplete="confirm-password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<div className="mb-6">
						<label className="block mb-2 text-sm font-bold">
							First Name
						</label>
						<input
							className="w-full px-3 py-2 mb-3 text-dark-dark leading-tight border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="First Name"
							autoComplete="first-name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div className="mb-6">
						<label className="block mb-2 text-sm font-bold">
							Last Name
						</label>
						<input
							className="w-full px-3 py-2 mb-3 text-dark-dark leading-tight border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="Last Name"
							autoComplete="last-name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
					<div className="mb-6">
						<label className="block mb-2 text-sm font-bold">
							Avatar url
						</label>
						<input
							className="w-full px-3 py-2 mb-3 text-dark-dark leading-tight border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="Avatar"
							autoComplete="avatar"
							value={avatar}
							onChange={(e) => setAvatar(e.target.value)}
						/>
					</div>
					<div className="flex items-center justify-between">
						<Button
							onClick={handleSignUp}
							label={"Sign up"}
							state={"enabled"}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
