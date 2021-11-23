import type { SET_USERID } from "./actions";

export interface IState {
	userId: string;
}

export interface IAction {
	type: typeof SET_USERID;
	payload: string;
}
