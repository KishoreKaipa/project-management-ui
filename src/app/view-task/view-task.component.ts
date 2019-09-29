import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task';
import { Apiservice } from '../apiservice.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ProjectModal } from '../projectmodal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  constructor(private modalService: NgbModal, private router: Router, private dateservice: DatePipe, private apiService: Apiservice) { }
  // tslint:disable-next-line: member-ordering
  taskModel = new Task();
  taskList: Task[] = [];

  ngOnInit() {
    this.taskList = this.apiService.getTaskList();
    const parenttask = this.apiService.getParentTaskList();
    this.taskList.concat(parenttask);
  }

  // sort tasks by endDate
  sortByEndDate() {

    this.taskList.sort((leftside, rightside) => {
      if (leftside.endDate < rightside.endDate) { return -1; }
      if (leftside.endDate > rightside.endDate) { return 1; }
      return 0;
    });
  }

  // sort tasks by startDate
  sortBystartDate() {

    this.taskList.sort((leftside, rightside) => {
      if (leftside.startDate < rightside.startDate) { return -1; }
      if (leftside.startDate > rightside.startDate) { return 1; }
      return 0;
    });
  }

  // sort tasks by priority
  sortByPriority() {

    this.taskList.sort((leftside, rightside) => {
      if (leftside.priority < rightside.priority) { return -1; }
      if (leftside.priority > rightside.priority) { return 1; }
      return 0;
    });
  }

  // sort by completion status
  sortByCompleted() {

    this.taskList.sort((leftside, rightside) => {
      if (leftside.taskStatus < rightside.taskStatus) { return -1; }
      if (leftside.taskStatus > rightside.taskStatus) { return 1; }
      return 0;
    });
  }

  // open ProjectDetails model
  openProject() {

    const modalRef = this.modalService.open(ProjectModal);
    modalRef.componentInstance.name = 'Wrold';
    modalRef.result.then((result) => {
      if (result) {
        this.taskModel.projectDescription = result.projectDescription;
        this.taskModel.projectId = result.projectId;
        this.taskList = this.taskList.filter(obj => obj.projectDescription === this.taskModel.projectDescription);
      }
    });
  }

  // Deletes task
  deleteTask(task) {
    task.completed = true;
    task.taskStatus = 'InActive';

    this.apiService.addTask(task);
    this.taskList = this.taskList.filter(obj => obj.taskId !== task.taskId);
    this.taskList.push(task);

  }

  // returns false if task is ACTIVE
  checkDisabled(task) {
    console.log(task);
    if (task.taskStatus === 'ACTIVE') {
      return false;
    } else {
      return true;
    }
  }

  // edits task
  editTask(task) {
    this.apiService.setTaskData(task);
    this.router.navigate(['/AddTask'], { state: task });
  }
}
