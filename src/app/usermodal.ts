import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {User} from './user/user';
import {Apiservice} from './apiservice.service';
@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">User List</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <input [(ngModel)]="searchText" placeholder="search text" name="searchText" />
      <table class="table table-striped">
      <thead>
      <tr>
      <th> FirstName </th>
      <th> Last Name </th>
      <th> Employee Id </th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let user of userList | filter:searchText">
      <td>{{user.firstName}}</td>
      <td>{{user.lastName}}</td>
      <td>{{user.employeeId}}</td>
      <td><button type="button" class="btn btn-outline-dark" (click)="selectUser(user);activeModal.close('Close click')">Add</button></td>
      </tr>
      </tbody>
     </table>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    
  

      </div>
  `
})
export class UserModal {
  @Input() name;
  searchText;
  userList: User[]=[];
  constructor(public activeModal: NgbActiveModal,private apiService:Apiservice) {
    this.userList=this.apiService.getUserList();
  }

  selectUser(user)
  {
    console.log(user.employeeId);
    this.activeModal.close(user);
  }
}

