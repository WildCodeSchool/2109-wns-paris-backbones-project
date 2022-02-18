export const findSameTitle = (
	array: any[] | undefined,
	title: String,
	id: Number = -1
) => {
	const matchingTitle =
		id != -1
			? array
					?.filter((element) => element.id != id)
					.find((element) => element.title === title)
			: array?.find((element) => element.title === title);
	return !!matchingTitle;
};

export const resolveNotOnProject = (
	inputArray: any[] | undefined,
	projectsArray: any[] | undefined
) => {
	let result = [];
	if (inputArray && inputArray[0] && projectsArray) {
		result = inputArray.filter((element) => {
			return !projectsArray?.map((el) => el.id).includes(element.id);
		});
	}
	return result.length > 0 ? result : false;
};

// todo: createNotification
