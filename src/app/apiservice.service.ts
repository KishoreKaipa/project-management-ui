import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './project/project';
import { Task } from './task/task';
import { User } from './user/user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Apiservice {

  constructor(private httpClient: HttpClient) { }
  private userURL = environment.userURL;
  private projectURL = environment.projectURL;
  private taskURL = environment.taskURL;
  private parenttaskURL = environment.parenttaskURL;



  task: Task = new Task();


  // Returns all userDetails
  getUserList() {
    const userList: User[] = [];
    this.httpClient.get<User[]>(this.userURL).subscribe(data => {
      data.forEach(item => {
        const userModel = new User();
        userModel.firstName = item.firstName;
        userModel.lastName = item.lastName;
        userModel.employeeId = item.employeeId;
        userModel.userId = item.userId;
        userList.push(userModel);
      });
    });
    return userList;
  }


  // Adds userDetails or edit existing userDetails
  addUser(user) {
    let userId;
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    header.set('Accept', 'application/json');
    header.set('Access-Control-Allow-Origin', '*');
    header.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    header.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    const options = {
      headers: header
    };
    // for adding new user
    if (user.userId === null || user.userId === undefined) {
      this.httpClient.post(this.userURL, user, options).subscribe((data: any) => {
        userId = data.userId;
      },
        error => {
          console.log('error', error);
        }
      );
      return userId;
    } else {
      this.httpClient.put(this.userURL, user, options).subscribe((data: any) => {
        userId = data.userId;
      },
        error => {
          console.log('error', error);
        }
      );
      return userId;
    }
  }

  // Returns list of all projectDetails
  getProjectList() {
    const projectList: Project[] = [];
    this.httpClient.get<Project[]>(this.projectURL).subscribe(data => {
      data.forEach(item => {
        const projectModel = new Project();
        projectModel.projectDescription = item.projectDescription;
        projectModel.startDate = item.startDate;
        projectModel.endDate = item.endDate;
        projectModel.priority = item.priority;
        if (item.taskList.length > 0) {
          projectModel.taskNumber = item.taskList.length;
          const completetaskList = item.taskList.filter(obj => obj.taskStatus !== 'ACTIVE');
          projectModel.taskcompleted = completetaskList.length;
        } else {
          projectModel.taskNumber = 0;
          projectModel.taskcompleted = 0;
        }
        projectModel.projectId = item.projectId;
        if (item.userDetails && item.userDetails.firstName) {
          projectModel.managerName = item.userDetails.firstName;
        } 
        console.log()
        console.log('coming specific object', projectModel);
        projectList.push(projectModel);
      });
    });
    return projectList;
  }

  // Add a new project / edit an existing project
  addProject(project) {
    let projectId;
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    header.set('Accept', 'application/json');
    header.set('Access-Control-Allow-Origin', '*');
    header.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    header.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    const options = {
      headers: header
    };
    // add new projectDetails
    if (project.projectId === null || project.projectId === undefined) {
      const user = new User();
      user.userId = project.userId;
      project.userDetails = user;
      this.httpClient.post(this.projectURL, project, options).subscribe((data: any) => {
        projectId = data.projectId;
      },
        error => {
          console.log('error', error);
        }
      );
      return projectId;
    } else {
      const user = new User();
      user.userId = project.userId;
      project.userDetails = user;
      this.httpClient.put(this.projectURL, project, options).subscribe((data: any) => {
        projectId = data.projectId;
      },
        error => {
          console.log('error', error);
        }
      );
      return projectId;
    }
  }

  // Deletes Project Details
  deleteProject(project) {
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    const options = {
      headers: header
    };
    this.httpClient.delete(this.projectURL + '/' + project.projectId, options).subscribe(() => {
    },
      error => {
        console.log('error', error);
      }
    );
  }


  // Deletes userDetails
  deleteUser(user) {
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    const options = {
      headers: header
    };

    this.httpClient.delete(this.userURL + '/' + user.userId, options).subscribe(() => {
    },
      error => {
        console.log('error', error);
      }
    );
  }


  // Deletes taskDetails
  deleteTask(task) {
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');


    const options = {
      headers: header
    };
    this.httpClient.delete(this.taskURL + '/' + task.taskId, options).subscribe(() => {
    },
      error => {
        console.log('error', error);
      }
    );
  }


  // Returns all Task details
  getTaskList() {
    const taskList: Task[] = [];

    this.httpClient.get<Task[]>(this.taskURL).subscribe((data: any) => {
      data.forEach(item => {
        console.log(data);
        const taskModel = new Task();
        taskModel.taskDescription = item.taskDescription;
        taskModel.startDate = item.startDate;
        taskModel.endDate = item.endDate;
        taskModel.priority = item.priority;
        if (item.parentTaskDetails != null) {
          taskModel.parentTaskDescription = item.parentTaskDetails.parentTaskDescription;
          taskModel.parentTaskId = item.parentTaskDetails.parentId;
        }
        if (item.userDetails != null) {
          taskModel.userName = item.userDetails.firstName;
          taskModel.userId = item.userDetails.userId;
        }
        if (item.projectDetails != null) {
          taskModel.projectDescription = item.projectDetails.projectDescription;
          taskModel.projectId = item.projectDetails.projectId;
        }
        taskModel.taskStatus = item.taskStatus;
        taskModel.taskId = item.taskId;
        taskList.push(taskModel);
      });
    });
    return taskList;
  }

  // Returns all parentTaskDetails
  getParentTaskList() {
    const taskList: Task[] = [];
    this.httpClient.get<Task[]>(this.parenttaskURL).subscribe(data => {
      data.forEach(item => {
        console.log(data);
        const taskModel = new Task();
        taskModel.parentTaskDescription = item.parentTaskDescription;
        taskModel.parentTaskId = item.parentId;
        taskModel.IsParentTask = true;
        if (item.projectDetails != null) {
          taskModel.projectDescription = item.projectDetails.projectDescription;
          taskModel.projectId = item.projectDetails.projectId;
        }
        taskList.push(taskModel);
      });
    });
    return taskList;
  }


  // Add or edit taskDetails and parentTaskDetails
  addTask(task) {
    let taskId;
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    header.set('Accept', 'application/json');
    header.set('Access-Control-Allow-Origin', '*');
    header.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    header.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    const options = {
      headers: header
    };

    // if task is parentTask then add parentTaskDetails
    if (task.IsParentTask) {
      console.log('parenttask', task);
      const parentTask = {
        parentTaskDescription: task.taskDescription,
        projectDetails:
        {
          projectId: task.projectId
        }
      };

      this.httpClient.post(this.parenttaskURL, parentTask, options).subscribe((data: any) => {
        taskId = data.parenttaskId;
      },
        error => {
          console.log('error', error);
        }
      );
    } else {
      // Make sure to not pass userDetails if there is no user assignment to task
      const user = new User();
      user.userId = task.userId;
      task.userDetails = user;

      // Make sure to not pass projectDetails if there is no project assignment to task
      const project = new Project();
      project.projectId = task.projectId;
      task.projectDetails = project;

      // Make sure to not pass parentTaskDetails if there is no parentTask assignment to task
      const parentTask = new Task();
      parentTask.parentId = task.parentTaskId;
      task.parentTaskDetails = parentTask;

      // if taskId is null then create task else update task
      if (task.taskId === null || task.taskId === undefined) {
        this.httpClient.post(this.taskURL, task, options).subscribe((data: any) => {
          taskId = data.taskId;
        },
          error => {
            console.log('error', error);
          }
        );
      } else {
        this.httpClient.put(this.taskURL, task, options).subscribe((data: any) => {
          taskId = data.taskId;
        },
          error => {
            console.log('error', error);
          }
        );
      }
    }
    return taskId;
  }
  setTaskData(task) {
    this.task = task;
  }
  getTaskData() {
    return this.task;
  }
}
