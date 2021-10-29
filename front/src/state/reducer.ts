import { SET_USERID } from "./actions";

interface IAction {
	type: string;
	payload?: string | object;
}

const reducer = (state: {}, action: IAction) => {
	switch (action.type) {
		case SET_USERID:
			console.log(action.payload);
			return { ...state, userId: action.payload };
		default:
			return state;
	}
};

export default reducer;
