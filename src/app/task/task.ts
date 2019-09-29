
import {User} from '../user/user';
import { Project } from '../project/project';
export class Task
{
    constructor()
    {

    }

    projectDescription:string;
    parentTaskDescription:string;
    taskDescription: string;
    parentTaskId:number;
    priority:number;
    startDate: Date;
    endDate: Date;
    completed:boolean;
    userName:string;
    userDetails:User;
    projectDetails:Project;
    parentTaskDetails:Task;
    IsParentTask: boolean;
    projectId:number;
    taskId:number;
    userId:number;
    parentId:number;
    taskStatus:String;
}