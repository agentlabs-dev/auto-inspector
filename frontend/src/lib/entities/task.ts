export type Task = {
	id: string;
	description: string;
	status: 'pending' | 'running' | 'completed' | 'failed';
};
