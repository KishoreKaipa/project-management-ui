import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import { User } from './user';
import {Apiservice} from '../apiservice.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private apiService:Apiservice) { }

  ngOnInit() {
    this.userList=this.apiService.getUserList();
  }

  userModel = new User();
  buttonValue = 'Add';
  searchText : string;
  userList: User[]=[];

  addUser()
  {
    console.log('Add user');
   
    const userId=this.apiService.addUser(this.userModel);
    this.userModel.userId=userId;
    
    if(this.buttonValue==='Edit')
    {
      this.userList=this.userList.filter(obj=> obj.userId !== this.userModel.userId);
 //this.userList.splice(this.userModel.userId);
 console.log('edit',this.userList);
    }
   
     this.userList.push(this.userModel);
     this.buttonValue='Add';
     this.userModel=new User();
  }

  reset()
  {
    console.log('coming to reset');
   // this.userModel={};
    this.buttonValue='Add';
  }
  sortByFName()
  {
    console.log('sorting... FName');
    this.userList.sort((leftside,rightside) => {
            if(leftside.firstName < rightside.firstName) return -1;
            if(leftside.firstName > rightside.firstName) return 1;
            return 0;
    });
  }
  edit(user)
  {
    console.log('coming to edit',user.userId);
    this.buttonValue='Edit'
    this.userModel=user;
  }

  delete(user)
  {
    console.log('coming to delete');
    this.userModel=user;
  }

  sortByLName()
  {
    console.log('sorting... LName');
    this.userList.sort((leftside,rightside) => {
            if(leftside.lastName < rightside.lastName) return -1;
            if(leftside.lastName > rightside.lastName) return 1;
            return 0;
    });
  }

  sortByEmployeeId()
  {
    console.log('sorting... Id');
    this.userList.sort((leftside,rightside) => {
            if(leftside.employeeId < rightside.employeeId) return -1;
            if(leftside.employeeId > rightside.employeeId) return 1;
            return 0;
    });
  }

}
