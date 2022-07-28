import type { SET_USERID } from "./actions";

export interface IState {
	userId: number;
}

export interface IAction {
	type: typeof SET_USERID;
	payload: number | null;
}
