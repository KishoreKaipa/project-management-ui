import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Project} from './project/project';
import {Apiservice} from './apiservice.service';
@Component({
  selector: 'ngbd-modal-content-project',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Project List</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <input [(ngModel)]="searchText" placeholder="search text" name="searchText" />
      <table class="table table-striped">
      <thead>
      <tr>
      <th> Project Name </th>
      <th> StartDate</th>
      <th> End Date </th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let project of projectList | filter:searchText">
      <td>{{project.projectDescription}}</td>
      <td>{{project.startDate}}</td>
      <td>{{project.endDate}}</td>
      <td><button type="button" class="btn btn-outline-dark" (click)="selectProject(project);activeModal.close('Close click')">Add</button></td>
      </tr>
      </tbody>
     </table>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
  </div>
  `
})
export class ProjectModal {
  @Input() name;
    searchText;
    projectList: Project[]=[];
    constructor(public activeModal: NgbActiveModal,private apiService:Apiservice) {
      this.projectList=this.apiService.getProjectList();
    }

  selectProject(project)
  {
    console.log(project.projectName);
    this.activeModal.close(project);
  }
  
}

