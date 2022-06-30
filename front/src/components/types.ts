export interface Project {
	id: number;
	title: string;
	description?: string;
	photo?: string;
	start_date?: Date;
	end_date?: Date;
	statuses?: Status[];
	users?: BackBonesUser[];
	tasks?: Task[];
	roles?: Role[];
	notifications?: Notification[];
}

export interface BackBonesUser {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	avatar?: string;
	password?: string;
	deletedDate?: Date;
	roles?: Role[];
	projects?: Project[];
	tasks?: Task[];
	notifications?: Notification[];
}

export interface Task {
	id: number;
	title: string;
	description?: string;
	effective_time?: Date;
	estimated_time?: Date;
	start_date?: Date;
	end_date?: Date;
	deletedDate?: Date;
	status?: Status;
	project: Project;
	users?: BackBonesUser[];
	notifications?: Notification[];
}

export interface Notification {
	id: number;
	title: string;
	description?: string;
	read?: boolean;
	created_at?: Date;
	user?: BackBonesUser;
	task?: Task;
	project?: Project;
}

export interface Role {
	id: number;
	title: string;
	users?: BackBonesUser[];
	project?: Project;
}

export interface Status {
	id: number;
	title: string;
	tasks?: Task[];
	project?: Project;
}

export interface TaskInput {
	title?: string;
	description?: string;
	effective_time?: Date;
	estimated_time?: Date;
	start_date?: Date;
	end_date?: Date;
	status?: { id: number };
	users?: { id: number }[];
}
