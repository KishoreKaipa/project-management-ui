import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Project} from './project/project';
import { Task} from './task/task';
import { User} from './user/user';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { environment } from '../environments/environment';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Apiservice {

  constructor(private httpClient:HttpClient) { }
    private userURL=environment.userURL;
    private  projectURL=environment.projectURL;
    private taskURL=environment.taskURL;
    private parenttaskURL=environment.parenttaskURL;
  
    
  // Returns all userDetails
  getUserList()
  {
    let userList:User[]=[];
    this.httpClient.get<User[]>(this.userURL).subscribe(data=>{
      data.forEach(item=>{
        const userModel = new User();
        userModel.firstName=item.firstName;
        userModel.lastName=item.lastName;
        userModel.employeeId=item.employeeId;
        userModel.userId=item.userId;
       userList.push(userModel);
      });
   });
    return userList;
  }


  // Adds userDetails or edit existing userDetails
addUser(user)
{
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
   // for adding new user
   if(user.userId ===null || user.userId ===undefined )
   {
   this.httpClient.post(this.userURL,user,options).subscribe((data:any)=>{
      userId=data.userId;
     },
    error => {
      console.log('error',error);
    }
  );
  return userId;
  }
  // for editing existing user
  else
  {
  this.httpClient.put(this.userURL,user,options).subscribe((data:any)=>{
      userId=data.userId;
      },
    error => {
      console.log('error',error);
    }
  );
  return userId;
  }
}

  // Returns list of all projectDetails
getProjectList()
{
    let projectList:Project[]=[];
    this.httpClient.get<Project[]>(this.projectURL).subscribe(data=>{
      data.forEach(item=>{
        const projectModel = new Project();
        projectModel.projectDescription=item.projectDescription;
        projectModel.startDate=item.startDate;
        projectModel.endDate=item.endDate;
        projectModel.priority=item.priority;
        if(item.taskList.length > 0)
        {
          projectModel.taskNumber=item.taskList.length;
          const completetaskList=item.taskList.filter(obj=> obj.taskStatus !== 'ACTIVE');
          projectModel.taskcompleted=completetaskList.length;
        }
        else {
          projectModel.taskNumber=0;
          projectModel.taskcompleted=0;
        }
        projectModel.projectId=item.projectId;
        console.log('coming specific object',projectModel);
       projectList.push(projectModel);
      });
   });
  return projectList;
}

// Add a new project / edit an existing project
addProject(project)
{
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
   // add new projectDetails
  if(project.projectId ===null || project.projectId  ===undefined )
  {
   const user = new User();
   user.userId=project.userId;
   project.userDetails=user;
   this.httpClient.post(this.projectURL,project,options).subscribe((data:any)=>{
    projectId=data.projectId;
    },
    error => {
      console.log('error',error);
    }
  );
  return projectId;
  }
  // edit existing projectDetails
  else 
  {
  const user = new User();
  user.userId=project.userId;
  project.userDetails=user;
  this.httpClient.put(this.projectURL,project,options).subscribe((data:any)=>{
      projectId=data.projectId;
    },
    error => {
      console.log('error',error);
    }
  );
  return projectId;
  }
}

// Deletes Project Details
deleteProject(project)
{  
  let header= new HttpHeaders();
  header.set('Content-Type','application/json');
  let options=
   {
     headers:header
   };
   this.httpClient.delete(this.projectURL+'/'+project.projectId,options).subscribe((data:any)=>{
   },
    error => {
      console.log('error',error);
    }
  );
}


// Deletes userDetails
deleteUser(user)
{
  let header= new HttpHeaders();
  header.set('Content-Type','application/json');
  let options= {
     headers:header
   };
   
   this.httpClient.delete(this.userURL+'/'+user.userId,options).subscribe((data:any)=>{
    },
    error => {
      console.log('error',error);
    }
  );
}


// Deletes taskDetails
deleteTask(task)
{  
  let header= new HttpHeaders();
  header.set('Content-Type','application/json');
   

  let options= {
     headers:header
   };
   this.httpClient.delete(this.taskURL+'/'+task.taskId,options).subscribe((data:any)=>{
  },
  error => {
    console.log('error',error);
  }
 );
}


// Returns all Task details
getTaskList()
{
    let taskList:Task[]=[];
  
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
        taskModel.taskStatus=item.taskStatus;
        taskModel.taskId=item.taskId;
       taskList.push(taskModel);
      });
   });
  return taskList;
}

// Returns all parentTaskDetails
getParentTaskList()
{
  let taskList:Task[]=[];
    this.httpClient.get<Task[]>(this.parenttaskURL).subscribe(data=>{
      data.forEach(item=>{
        console.log(data);
        const taskModel = new Task();
        taskModel.parentTaskDescription=item.parentTaskDescription;
        taskModel.parentTaskId=item.parentId;
        taskModel.IsParentTask=true;
        if(item.projectDetails !=null)
        {
        taskModel.projectDescription=item.projectDetails.projectDescription;
        taskModel.projectId=item.projectDetails.projectId;
        }
       taskList.push(taskModel);
      });
   });
  return taskList;
}


// Add or edit taskDetails and parentTaskDetails
addTask(task)
{
  let taskId;
  let header= new HttpHeaders();
  header.set('Content-Type','application/json');
  header.set('Accept','application/json');
  header.set('Access-Control-Allow-Origin','*');
  header.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  header.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  let options= {
     headers:header
  };

  // if task is parentTask then add parentTaskDetails
  if(task.IsParentTask)
  {
    console.log('parenttask',task);
    let parentTask= {
       "parentTaskDescription":task.taskDescription,
       "projectDetails":
       {
         "projectId":task.projectId
       }
     }
     
    this.httpClient.post(this.parenttaskURL,parentTask,options).subscribe((data:any)=>{
      taskId=data.parenttaskId;
    },
    error => {
      console.log('error',error);
    }
    );
  } 
  // if task is not a parentTask then add or edit task based on taskId param
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
   // if taskId is null then create task
   if(task.taskId ===null || task.taskId ===undefined )
   {
   this.httpClient.post(this.taskURL,task,options).subscribe((data:any)=>{
     taskId=data.taskId;
    },
    error => {
      console.log('error',error);
    }
  );
  }
  // if taaskId is not null then edit that task
  else
  {
    this.httpClient.put(this.taskURL,task,options).subscribe((data:any)=>{
      taskId=data.taskId;
    },
    error => {
      console.log('error',error);
    }
    );
  }
  }
 return taskId;
}



task : Task = new Task();
  setTaskData(task)
    {
      this.task=task;
    }
  getTaskData()
    {
      return this.task;
    }
}