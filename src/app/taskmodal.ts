import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Task} from './task/task';
import {Apiservice} from './apiservice.service';
@Component({
  selector: 'ngbd-modal-content-t',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Task List</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <input [(ngModel)]="searchText" placeholder="search text" name="searchText" />
      <table class="table table-striped">
      <thead>
      <tr>
      <th> Parent TaskName </th>
      
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let task of taskList | filter:searchText">
      <td>{{task.parentTaskDescription}}</td>
      <td>{{task.taskName}}</td>
      <td>{{task.parentTaskName}}</td>
      <td><button type="button" class="btn btn-outline-dark" (click)="selectTask(task);activeModal.close('Close click')">Add</button></td>
      </tr>
      </tbody>
     </table>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    
  

      </div>
  `
})
export class TaskModal {
  @Input() name;
    searchText;
    taskList: Task[]=[];
    constructor(public activeModal: NgbActiveModal,private apiService:Apiservice) {
      this.taskList=this.apiService.getParentTaskList();
    }
  selectTask(task)
  {
   
    this.activeModal.close(task);
  }
 
}

