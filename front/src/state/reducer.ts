import { SET_USERID } from "./actions";
import { IState, IAction } from "./types";

const reducer = (state: IState, action: IAction) => {
	switch (action.type) {
		case SET_USERID:
			return { ...state, userId: action.payload };
		default:
			return state;
	}
};

export default reducer;
