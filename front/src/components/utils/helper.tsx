import { Status, StatusInput } from "../types";

export const getStatusesToRemove = (
	oldStatuses: Status[] | undefined,
	newStatuses: StatusInput[] | undefined
): Status[] | false => {
	if (oldStatuses && newStatuses) {
		const statusesToRemoves: Status[] = [];
		oldStatuses.forEach((oldStatus) => {
			const isStatusToRemove = newStatuses.every((newStatus) => {
				return oldStatus.id !== newStatus.id;
			});
			if (isStatusToRemove) {
				statusesToRemoves.push(oldStatus);
			}
		});

		return statusesToRemoves ? statusesToRemoves : false;
	} else {
		return false;
	}
};
