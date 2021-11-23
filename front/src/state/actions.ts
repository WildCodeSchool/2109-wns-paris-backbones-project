export const SET_USERID = "SET_USERID" as const;

export const setUserId = (newId: string) => {
	return {
		type: SET_USERID,
		payload: newId,
	};
};
