import React from "react";
import App from "../App";
import reducer from "./reducer";
import type { IAction, IState } from "./types";

const initialState: IState = {
	userId: "",
};
export const StateProvider = React.createContext(initialState);

const initialDispatch: React.Dispatch<IAction> = () => {};
export const DispatchProvider = React.createContext(initialDispatch);

const GlobalState = () => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	return (
		<StateProvider.Provider value={state}>
			<DispatchProvider.Provider value={dispatch}>
				<App />
			</DispatchProvider.Provider>
		</StateProvider.Provider>
	);
};

export default GlobalState;
