import React from "react";
import App from "../App";
import reducer from "./reducer";
import { setUserId } from "./actions";

const initialState: any = {
	userId: "",
};
export const StateProvider = React.createContext(initialState);
const initialDispatch: any = {
	setUserId,
};
export const DispatchProvider = React.createContext(initialDispatch);

const GlobalState = () => {
	const [state, dispatch] = React.useReducer<any>(reducer, initialState);
	return (
		<StateProvider.Provider value={state}>
			<DispatchProvider.Provider value={dispatch}>
				<App />
			</DispatchProvider.Provider>
		</StateProvider.Provider>
	);
};

export default GlobalState;
