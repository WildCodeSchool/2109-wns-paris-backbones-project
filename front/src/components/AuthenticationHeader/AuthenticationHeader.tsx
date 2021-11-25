import React, { useContext } from "react";
import { DispatchProvider } from "../../state/GlobalStateProvider";
import { setUserId } from "../../state/actions";

const AuthenticationHeader = () => {
	const [input, setInput] = React.useState("");
	const dispatch = useContext(DispatchProvider);

	return (
		<header className="App-header flex justify-center">
			<form
				className="flex flex-col"
				onSubmit={(e) => {
					e.preventDefault();
					dispatch(setUserId(input));
				}}
			>
				<label htmlFor="authentication" className="text-center">
					Enter your user ID
				</label>
				<input
					id="authentication"
					className="outline-none px-4 py-2 w-80"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<input type="submit" value="Submit" />
			</form>
		</header>
	);
};

export default AuthenticationHeader;
