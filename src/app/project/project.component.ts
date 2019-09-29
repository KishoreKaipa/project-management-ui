import { Component, OnInit } from '@angular/core';
import { Project } from './project';
import { Apiservice } from '../apiservice.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { UserModal } from '../usermodal';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private modalService: NgbModal, private dateservice: DatePipe, private apiService: Apiservice) { }
  // tslint:disable-next-line: member-ordering
  searchText;
  // tslint:disable-next-line: member-ordering
  projects: Project[] = [];
  // tslint:disable-next-line: member-ordering
  buttonValue = 'Add';
  // tslint:disable-next-line: member-ordering
  projectModel = new Project();
  // tslint:disable-next-line: member-ordering
  isDisabled = true;
  // tslint:disable-next-line: member-ordering
  isErrormsg = false;
  theCheckbox = false;

  ngOnInit() {
    this.projects = this.apiService.getProjectList();
  }

  // sets startDate and endDate if selected
  dateSet() {
    if (this.theCheckbox) {
      this.isDisabled = false;
      this.projectModel.startDate = this.dateservice.transform(new Date(), 'yyyy-MM-dd');
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);
      this.projectModel.endDate = this.dateservice.transform(endDate, 'yyyy-MM-dd');

    } else {
      this.isDisabled = true;
    }
  }

  // edits startDate and endDate
  dateChange() {
    if (this.projectModel.startDate < this.projectModel.endDate) {
      this.isErrormsg = false;
    } else {
      this.isErrormsg = true;
    }
  }

  // opens user module
  openUser() {
    const modalRef = this.modalService.open(UserModal);
    modalRef.result.then((result) => {
      if (result) {
        this.projectModel.managerName = result.firstName;
        this.projectModel.userId = result.userId;
      }
    });
  }

  // adds projectDetails
  addProject() {
    const projectId = this.apiService.addProject(this.projectModel);
    this.projectModel.projectId = projectId;

    this.projects = this.projects.filter(obj => obj.projectId !== this.projectModel.projectId);
    {
      this.projects.push(this.projectModel);
    }
    this.buttonValue = 'Add';
    this.projectModel = new Project();
    this.isDisabled = true;
    this.theCheckbox = false;
    this.isErrormsg = false;
  }

  // edit projectDetails
  edit(project) {
    this.buttonValue = 'Edit';
    this.isDisabled = false;
    this.projectModel = project;
  }

  // reset projectDetails
  reset() {
    // this.projectModel={};
    this.isDisabled = true;
    this.theCheckbox = false;
  }

  // sort by endDate
  sortByEndDate() {
    this.projects.sort((leftside, rightside) => {
      if (leftside.endDate < rightside.endDate) { return -1; }
      if (leftside.endDate > rightside.endDate) { return 1; }
      return 0;
    });
  }

  // sort by startDate
  sortBystartDate() {
    this.projects.sort((leftside, rightside) => {
      if (leftside.startDate < rightside.startDate) { return -1; }
      if (leftside.startDate > rightside.startDate) { return 1; }
      return 0;
    });
  }

  // sort by project priority
  sortByPriority() {
    this.projects.sort((leftside, rightside) => {
      if (leftside.priority < rightside.priority) { return -1; }
      if (leftside.priority > rightside.priority) { return 1; }
      return 0;
    });
  }

  // sort by completion status
  sortByCompleted() {
    this.projects.sort((leftside, rightside) => {
      if (leftside.taskcompleted < rightside.taskcompleted) { return -1; }
      if (leftside.taskcompleted > rightside.taskcompleted) { return 1; }
      return 0;
    });
  }

  // deletes projectDetails
  delete(project) {
    this.apiService.deleteProject(project);
    this.projects = this.projects.filter(obj => obj.projectId !== project.projectId);
  }
}
