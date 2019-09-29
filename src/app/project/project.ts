import { User } from '../user/user';
import { Task } from '../task/task';
export class Project {
    constructor() {

    }

    projectDescription: string;
    startDate: any;
    endDate: any;
    priority = 0;
    userDetails: User;
    managerName: string;
    taskCount: number;
    projectId: number;
    userId: number;
    taskNumber: number;
    completed: boolean;
    taskList: Task[];
    taskcompleted: number;
}
