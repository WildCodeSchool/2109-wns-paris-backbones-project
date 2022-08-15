import React, { useEffect, useRef, useState } from "react";
import { StatusInput } from "../types";
import Button from "../utils/Button";
import CheckButton from "../utils/StatusIcon";
import { DeleteOutline } from "@material-ui/icons";

interface AddStatusFormProps {
	addStatuses: (statuses: StatusInput[]) => void;
	projectStatuses?: StatusInput[];
}

const defaultStatus: StatusInput[] = [
	{
		title: "To do",
		isDoneStatus: false,
	},
	{
		title: "In progress",
		isDoneStatus: false,
	},
	{
		title: "Done",
		isDoneStatus: true,
	},
];

const AddStatusForm = ({
	addStatuses,
	projectStatuses,
}: AddStatusFormProps) => {
	const [statuses, setStatuses] = useState<StatusInput[]>(
		projectStatuses || defaultStatus
	);
	const [statusToAdd, setStatusToAdd] = useState<StatusInput>({
		isDoneStatus: false,
	});
	const titleRef = useRef<HTMLInputElement>(null);

	const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		statuses[Number(e.target.id)].title = e.target.value;
		setStatuses([...statuses]);
	};

	const handleChangeIsDone = (value: boolean, index: number) => {
		const newStatuses = [...statuses];
		const newStatus = { ...newStatuses[index], isDoneStatus: value };
		newStatuses[index] = newStatus;
		setStatuses([...newStatuses]);
	};

	const handleAddStatus = async () => {
		setStatuses([...statuses, statusToAdd]);
		setStatusToAdd({ isDoneStatus: false });
		if (titleRef.current) {
			titleRef.current.value = "";
		}
	};

	const handleChangeStatusToAddTitle = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setStatusToAdd({
			...statusToAdd,
			title: e.target.value,
		});
	};

	useEffect(() => {
		addStatuses(statuses);
	}, [statuses]);

	const handleDeleteStatus = (index: number) => {
		statuses.splice(index, 1);
		setStatuses([...statuses]);
	};

	return (
		<div className="status-input">
			<div className={"status-list"}>
				{statuses.map((status, index) => (
					<div key={index} className={"status-item flex gap-2"}>
						<input
							className={"bg-dark-dark"}
							value={status.title}
							name={"title"}
							id={index.toString()}
							onChange={handleChangeTitle}
						/>
						{status.isDoneStatus !== undefined && (
							<div className={"flex"}>
								<button
									name={"isDoneStatus"}
									value={status.isDoneStatus.toString()}
									onClick={() =>
										handleChangeIsDone(
											!status.isDoneStatus,
											index
										)
									}
								>
									<CheckButton
										isDoneStatus={status.isDoneStatus}
									/>
								</button>
								<DeleteOutline
									className="text-secondary-dark cursor-pointer"
									onClick={() => handleDeleteStatus(index)}
								/>
							</div>
						)}
					</div>
				))}
			</div>
			<div className={"new-status"}>
				<input
					className={"bg-dark-dark"}
					type={"text"}
					name={"title"}
					placeholder={"Add status here"}
					onChange={handleChangeStatusToAddTitle}
					ref={titleRef}
				/>
			</div>
			<Button
				label={"add status"}
				state={statusToAdd.title ? "enabled" : "disabled"}
				onClick={handleAddStatus}
			/>
		</div>
	);
};

export default AddStatusForm;
