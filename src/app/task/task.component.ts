import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import { Task } from './task';
import {Apiservice} from '../apiservice.service';
import {NgbActiveModal,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {UserModal} from '../usermodal';
import {TaskModal} from '../taskmodal';
import {ProjectModal} from '../projectmodal';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private modalService:NgbModal,private dateservice:DatePipe,private apiService:Apiservice) { }

  ngOnInit() {
   const taskModel= this.apiService.getTaskData();
   this.taskModel=taskModel;
   if(this.taskModel.taskId !=null)
   {
     this.buttonValue='Edit';
   }
  }

  
  buttonValue = 'Add';
  
  taskModel=new Task();
  isDisabled=false;
  isErrormsg=false;
  theCheckbox=true;
  dateset()
  {
    
    if(this.taskModel.IsParentTask)
    {
      this.isDisabled=true;
     //this.taskModel.startDate=this.dateservice.transform(new Date(),'yyyy-MM-dd');
      let endDate= new Date();
      endDate.setDate(endDate.getDate()+1);
     // this.projectModel.endDate=this.dateservice.transform(endDate,'yyyy-MM-dd');

    }
    else
    {
      this.isDisabled=false;
    }
  }
dateChange()
{
  if(this.taskModel.startDate < this.taskModel.endDate)
  {
    console.log('validation looks goood');
  }
  else{
    this.isErrormsg=true;
  }
}

openUser()
{
 
   const modalRef=this.modalService.open(UserModal);
 
  modalRef.result.then((result) => {
    if(result)
    {
      this.taskModel.userName=result.firstName;
      this.taskModel.userId=result.userId;
    }
  }); 
}

openTask()
{
 
   const modalRef=this.modalService.open(TaskModal);
 
  modalRef.result.then((result) => {
    if(result)
    {
      this.taskModel.parentTaskDescription=result.parentTaskDescription;
      this.taskModel.parentTaskId=result.parentTaskId;
    }
  }); 
}
openProject()
{
 
   const modalRef=this.modalService.open(ProjectModal);
 
  modalRef.result.then((result) => {
    if(result)
    {
      this.taskModel.projectDescription=result.projectDescription;
      this.taskModel.projectId=result.projectId;
    }
  }); 
}

addTask()
{
 
   
    this.apiService.addTask(this.taskModel);
    
     this.buttonValue='Add';
     this.taskModel=new Task();
  this.isDisabled=true;
  this.theCheckbox=false;
}

reset()
{
  
 
  this.isDisabled=true;
  this.theCheckbox=false;
}
}
