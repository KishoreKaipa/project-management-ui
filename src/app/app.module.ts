import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FilterPipe} from './filter.pipe';
import { DatePipe} from '@angular/common';
import {Apiservice} from './apiservice.service';
import {UserModal} from './usermodal';
import {ProjectModal} from './projectmodal';
import {TaskModal} from './taskmodal';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProjectComponent,
    TaskComponent,
    ViewTaskComponent,
    FilterPipe,UserModal,ProjectModal,TaskModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [DatePipe,Apiservice],
  bootstrap: [AppComponent],
  entryComponents:[UserModal,ProjectModal,TaskModal]
})
export class AppModule { }
