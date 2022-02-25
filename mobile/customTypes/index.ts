export interface TaskData {
	id: number;
	title: string;
	description: string;
	photo: string;
	start_date: string;
	end_date: string;
	status: StatusData;
	users: UserData[];
}

export interface RoleData {
	id: number;
	title: string;
}

export interface StatusData {
	id: number;
	title: string;
}

export interface ProjectData {
	id: number;
	title: string;
	description: string;
	photo: string;
	start_date: string;
	end_date: string;
	tasks: TaskData[];
	users: UserData[];
}

export interface UserData {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	avatar: string;
	roles: RoleData[];
	projects: ProjectData[];
	tasks: TaskData[];
}
