import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Project} from './project/project';
import { Task} from './task/task';
import { User} from './user/user';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Apiservice {

  constructor(private httpClient:HttpClient) { }
    private userURL=environment.userURL;
    private  projectURL=environment.projectURL;
    private taskURL=environment.taskURL;
    private parenttaskURL=environment.parenttaskURL;
   
   
  
  

  getUserList()
  {
    console.log('coming get usrlist');
    let userList:User[]=[];
    this.httpClient.get<User[]>(this.userURL).subscribe(data=>{
      data.forEach(item=>{
        console.log(data);
     
        const userModel = new User();
        userModel.firstName=item.firstName;
        userModel.lastName=item.lastName;
        userModel.employeeId=item.employeeId;
        userModel.userId=item.userId;
        console.log('coming specific object',userModel);
       userList.push(userModel);
      });
   });

    return userList;
  }

  addUser(user)
  {
   console.log ('coming to add');
   let userId;
   let header= new HttpHeaders();
   header.set('Content-Type','application/json');
   header.set('Accept','application/json');
   header.set('Access-Control-Allow-Origin','*');
   header.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    header.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   let options=
   {
     headers:header
   };
   this.httpClient.post(this.userURL,user,options).subscribe((data:any)=>{
     userId=data.userId;
   console.log('post data',data);
   
 },
  error => {
    console.log('error',error);
  }
 );
 return userId;
  }
  getProjectList()
  {
    let projectList:Project[]=[];
    console.log('coming get usrlist');
    this.httpClient.get<Project[]>(this.projectURL).subscribe(data=>{
      data.forEach(item=>{
        console.log(data);
     
        const projectModel = new Project();
        projectModel.projectDescription=item.projectDescription;
        projectModel.startDate=item.startDate;
        projectModel.endDate=item.endDate;
        projectModel.priority=item.priority;
        if(item.taskList.length > 0)
        {
          projectModel.taskNumber=item.taskList.length;
        }
        else{
          projectModel.taskNumber=0;
        }
        projectModel.projectId=item.projectId;
        console.log('coming specific object',projectModel);
       projectList.push(projectModel);
      });
   });

    return projectList;
  }

  addProject(project)
  {
   console.log ('coming to add');
   let projectId;
   let header= new HttpHeaders();
   header.set('Content-Type','application/json');
   header.set('Accept','application/json');
   header.set('Access-Control-Allow-Origin','*');
   header.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    header.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   let options=
   {
     headers:header
   };
   const user = new User();
   user.userId=project.userId;
   project.userDetails=user;
   this.httpClient.post(this.projectURL,project,options).subscribe((data:any)=>{
    projectId=data.projectId;
   console.log('post data',data);
   
 },
  error => {
    console.log('error',error);
  }
 );

 return projectId;
  }
  getTaskList()
  {
    let taskList:Task[]=[];
    console.log('coming get usrlist');
    this.httpClient.get<Task[]>(this.taskURL).subscribe((data:any)=>{
      data.forEach(item=>{
        console.log(data);
     
        const taskModel = new Task();
        taskModel.taskDescription=item.taskDescription;
        taskModel.startDate=item.startDate;
        taskModel.endDate=item.endDate;
        taskModel.priority=item.priority;
        if(item.parentTaskDetails !=null)
        {
        taskModel.parentTaskDescription=item.parentTaskDetails.parentTaskDescription;
        taskModel.parentTaskId=item.parentTaskDetails.parentId;
        }
        if(item.userDetails !=null)
        {
        taskModel.userName=item.userDetails.firstName;
        taskModel.userId=item.userDetails.userId;
        }
        if(item.projectDetails !=null)
        {
        taskModel.projectDescription=item.projectDetails.projectDescription;
        taskModel.projectId=item.projectDetails.projectId;
        }
        if(item.taskStatus==='ACTIVE')
        {
        taskModel.completed=false;
        }
        taskModel.taskId=item.taskId;
        console.log('coming specific object',taskModel);
       taskList.push(taskModel);
      });
   });

    return taskList;
  }

  getParentTaskList()
  {
    let taskList:Task[]=[];
    console.log('coming get usrlist');
    this.httpClient.get<Task[]>(this.parenttaskURL).subscribe(data=>{
      data.forEach(item=>{
        console.log(data);
     
        const taskModel = new Task();
        taskModel.parentTaskDescription=item.parentTaskDescription;
        taskModel.parentTaskId=item.parentId;
       taskList.push(taskModel);
      });
   });

    return taskList;
  }

  addTask(task)
  {
   console.log ('coming to add');
   let taskId;
   let header= new HttpHeaders();
   header.set('Content-Type','application/json');
   header.set('Accept','application/json');
   header.set('Access-Control-Allow-Origin','*');
   header.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    header.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   let options=
   {
     headers:header
   };
   if(task.IsParentTask)
   {
     console.log('parenttask',task);
     let parentTask=
     {
       "parentTaskDescription":task.taskDescription,
       "projectDetails":
       {
         "projectId":task.projectId
       }
     }
     console.log(parentTask);
    this.httpClient.post(this.parenttaskURL,parentTask,options).subscribe((data:any)=>{
      taskId=data.parenttaskId;
    console.log('post data',data);
    
  },
   error => {
     console.log('error',error);
   }
  ); 
   }
   else
   {
   const  user= new User();
   user.userId=task.userId;
   const project=new Project();
   project.projectId=task.projectId;
   task.userDetails=user;
   task.projectDetails=project;
   const parentTask=new Task();
   parentTask.parentId=task.parentTaskId;
   task.parentTaskDetails=parentTask;
   console.log('task',task);
   this.httpClient.post(this.taskURL,task,options).subscribe((data:any)=>{
     taskId=data.taskId;
   console.log('post data',data);
   
 },
  error => {
    console.log('error',error);
  }
 );
}
 return taskId;
  }

  task : Task = new Task();

  setTaskData(task)
  {
    console.log(task);
    this.task=task;
  }
  getTaskData()
  {
    return this.task;
  }
 
}
