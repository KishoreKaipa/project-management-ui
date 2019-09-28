import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import { Task } from '../task/task';
import {Apiservice} from '../apiservice.service';
import {NgbActiveModal,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {ProjectModal} from '../projectmodal';
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  constructor(private modalService:NgbModal,private router:Router,private dateservice:DatePipe,private apiService:Apiservice) { }

  ngOnInit() {
    this.taskList=this.apiService.getTaskList();
  }
  taskModel=new Task()
  taskList: Task[]=[];

  sortByEndDate()
  {
    console.log('sorting... LName');
    this.taskList.sort((leftside,rightside) => {
            if(leftside.endDate < rightside.endDate) return -1;
            if(leftside.endDate > rightside.endDate) return 1;
            return 0;
    });
  }
  sortBystartDate()
  {
    console.log('sorting... LName');
    this.taskList.sort((leftside,rightside) => {
            if(leftside.startDate < rightside.startDate) return -1;
            if(leftside.startDate > rightside.startDate) return 1;
            return 0;
    });
  }

  sortByPriority()
  {
    console.log('sorting... Id');
    this.taskList.sort((leftside,rightside) => {
            if(leftside.priority < rightside.priority) return -1;
            if(leftside.priority > rightside.priority) return 1;
            return 0;
    });
  }
  sortByCompleted()
  {
    console.log('sorting... Id');
    this.taskList.sort((leftside,rightside) => {
            if(leftside.completed < rightside.completed) return -1;
            if(leftside.completed > rightside.completed) return 1;
            return 0;
    });
  }
  openProject()
{
  console.log('comgint to user');
   const modalRef=this.modalService.open(ProjectModal);
  modalRef.componentInstance.name='Wrold';
  modalRef.result.then((result) => {
    if(result)
    {
      this.taskModel.projectDescription=result.projectDescription;
      this.taskModel.projectId=result.projectId;
    }
  }); 
}

deleteTask(task)
{
  task.completed=true;
  this.taskList.push(task);

}
editTask(task)
{
  this.apiService.setTaskData(task);
this.router.navigate(['/AddTask'],{state:task});
}
}
