import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import { Project } from './project';
import {Apiservice} from '../apiservice.service';
import {NgbActiveModal,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {UserModal} from '../usermodal';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private modalService:NgbModal,private dateservice:DatePipe,private apiService:Apiservice) { }

  ngOnInit() {
    this.projects=this.apiService.getProjectList();
  }
  searchText;
  projects:Project[]=[];
  buttonValue='Add';
  projectModel=new Project();
  isDisabled=true;
  isErrormsg=false;
  theCheckbox=false;
  dateset()
  {
   
    if(this.theCheckbox)
    {
      this.isDisabled=false;
     this.projectModel.startDate=this.dateservice.transform(new Date(),'yyyy-MM-dd');
      let endDate= new Date();
      endDate.setDate(endDate.getDate()+1);
     this.projectModel.endDate=this.dateservice.transform(endDate,'yyyy-MM-dd');

    }
    else
    {
      this.isDisabled=true;
    }
  }
dateChange()
{
  if(this.projectModel.startDate < this.projectModel.endDate)
  {
    this.isErrormsg=false;
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
      this.projectModel.managerName=result.firstName;
      this.projectModel.userId=result.userId;
    }
  }); 
}

addProject()
{
  const projectId=this.apiService.addProject(this.projectModel);
    this.projectModel.projectId=projectId;
   
    this.projects=this.projects.filter(obj=> obj.projectId !== this.projectModel.projectId);
    {
     
     this.projects.push(this.projectModel);
    }
     this.buttonValue='Add';
     this.projectModel=new Project();
  this.isDisabled=true;
  this.theCheckbox=false;
  this.isErrormsg=false;
}
edit(project)
  {
   
    this.buttonValue='Edit'
    this.projectModel=project;
  }
reset()
{
  
 // this.projectModel={};
  this.isDisabled=true;
  this.theCheckbox=false;
}

sortByEndDate()
  {
    
    this.projects.sort((leftside,rightside) => {
            if(leftside.endDate < rightside.endDate) return -1;
            if(leftside.endDate > rightside.endDate) return 1;
            return 0;
    });
  }
  sortBystartDate()
  {
    this.projects.sort((leftside,rightside) => {
            if(leftside.startDate < rightside.startDate) return -1;
            if(leftside.startDate > rightside.startDate) return 1;
            return 0;
    });
  }

  sortByPriority()
  {
    
    this.projects.sort((leftside,rightside) => {
            if(leftside.priority < rightside.priority) return -1;
            if(leftside.priority > rightside.priority) return 1;
            return 0;
    });
  }
  sortByCompleted()
  {
    
    this.projects.sort((leftside,rightside) => {
            if(leftside.taskcompleted < rightside.taskcompleted) return -1;
            if(leftside.taskcompleted > rightside.taskcompleted) return 1;
            return 0;
    });
  }
  delete(project)
  {
    this.apiService.deleteProject(project);
    this.projects=this.projects.filter(obj=> obj.projectId !== project.projectId);
  }
}
