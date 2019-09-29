import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { Apiservice } from '../apiservice.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { UserModal } from '../usermodal';
import { TaskModal } from '../taskmodal';
import { ProjectModal } from '../projectmodal';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private modalService: NgbModal, private dateservice: DatePipe, private apiService: Apiservice) { }


  // tslint:disable-next-line: member-ordering
  buttonValue = 'Add';

  // tslint:disable-next-line: member-ordering
  taskModel = new Task();
  // tslint:disable-next-line: member-ordering
  isDisabled = false;
  // tslint:disable-next-line: member-ordering
  isErrormsg = false;
  theCheckbox = true;

  // upon initialization get all taskDetails from Project Management System
  ngOnInit() {
    const taskModel = this.apiService.getTaskData();
    this.taskModel = taskModel;
    if (this.taskModel.taskId != null) {
      this.buttonValue = 'Edit';
    }
  }

  // startDate and endDate values will be set accordingly if selected task is parentTask
  dateset() {
    if (this.taskModel.IsParentTask) {
      this.isDisabled = true;
      // this.taskModel.startDate=this.dateservice.transform(new Date(),'yyyy-MM-dd');
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);
      // this.projectModel.endDate=this.dateservice.transform(endDate,'yyyy-MM-dd');

    } else {
      this.isDisabled = false;
    }
  }

  // changes startDate and endDate accordingly
  dateChange() {
    if (this.taskModel.startDate < this.taskModel.endDate) {
      console.log('validation looks goood');
    } else {
      this.isErrormsg = true;
    }
  }

  // opens user model to assign a user for the task
  openUser() {
    const modalRef = this.modalService.open(UserModal);
    modalRef.result.then((result) => {
      if (result) {
        this.taskModel.userName = result.firstName;
        this.taskModel.userId = result.userId;
      }
    });
  }

  // opens task modal
  openTask() {
    const modalRef = this.modalService.open(TaskModal);
    modalRef.result.then((result) => {
      if (result) {
        this.taskModel.parentTaskDescription = result.parentTaskDescription;
        this.taskModel.parentTaskId = result.parentTaskId;
      }
    });
  }

  // opens project modal
  openProject() {
    const modalRef = this.modalService.open(ProjectModal);
    modalRef.result.then((result) => {
      if (result) {
        this.taskModel.projectDescription = result.projectDescription;
        this.taskModel.projectId = result.projectId;
      }
    });
  }

  // task creation or edit data
  addTask() {
    this.apiService.addTask(this.taskModel);
    this.buttonValue = 'Add';
    this.taskModel = new Task();
    this.isDisabled = true;
    this.theCheckbox = false;
  }

  // reset task modal data
  reset() {
    this.isDisabled = true;
    this.theCheckbox = false;
  }
}
