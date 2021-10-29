export const SET_USERID = "SET_USERID";

export const setUserId = (value: string) => {
	return {
		type: SET_USERID,
		payload: value,
	};
};
