import { Task } from "../types";
import UserBadge from "../UserBadge/UserBadge";

interface TaskCardProps {
	task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
	const { title, users } = task;
	return (
		<div className="task-holder flex flex-row w-full items-center justify-start px-2 py-1 my-3 bg-light-dark dark:bg-dark-dark rounded-3xl">
			<div className="icon"></div>
			<span className="task-title w-8/12 px-1 text-dark-medium dark:text-light-light flex-nowrap">
				{title}
			</span>
			{users && (
				<ul className="ml-auto flex flex-row">
					{users.map((user) => (
						<UserBadge
							key={user.id}
							user={user}
							withFirstName={false}
							size={"small"}
						/>
					))}
				</ul>
			)}
		</div>
	);
};

export default TaskCard;
