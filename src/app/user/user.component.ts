import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { Apiservice } from '../apiservice.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(private apiService: Apiservice) { }
  // tslint:disable-next-line: member-ordering
  userModel = new User();
  // tslint:disable-next-line: member-ordering
  buttonValue = 'Add';
  // tslint:disable-next-line: member-ordering
  searchText: string;
  userList: User[] = [];

  ngOnInit() {
    this.userList = this.apiService.getUserList();
  }

  // adds userDetails
  addUser() {
    const userId = this.apiService.addUser(this.userModel);
    this.userModel.userId = userId;
    if (this.buttonValue === 'Edit') {
      this.userList = this.userList.filter(obj => obj.userId !== this.userModel.userId);

    }
    this.userList.push(this.userModel);
    this.buttonValue = 'Add';
    this.userModel = new User();
  }

  // reset fields on user page
  reset() {
    this.buttonValue = 'Add';
  }

  // sort by firstName
  sortByFirstName() {
    this.userList.sort((leftside, rightside) => {
      if (leftside.firstName < rightside.firstName) { return -1; }
      if (leftside.firstName > rightside.firstName) { return 1; }
      return 0;
    });
  }

  // edit userDetails
  edit(user) {

    this.buttonValue = 'Edit';
    this.userModel = user;
  }

  // delete userDetails
  delete(user) {
    this.apiService.deleteUser(user);
    this.userList = this.userList.filter(obj => obj.userId !== user.userId);
  }

  // sort by lastName
  sortByLastName() {
    this.userList.sort((leftside, rightside) => {
      if (leftside.lastName < rightside.lastName) { return -1; }
      if (leftside.lastName > rightside.lastName) { return 1; }
      return 0;
    });
  }

  // sort by employeeId
  sortByEmployeeId() {
    this.userList.sort((leftside, rightside) => {
      if (leftside.employeeId < rightside.employeeId) { return -1; }
      if (leftside.employeeId > rightside.employeeId) { return 1; }
      return 0;
    });
  }
}
