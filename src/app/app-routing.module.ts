import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { ViewTaskComponent } from './view-task/view-task.component';


const routes: Routes = [
{
  path:'', redirectTo:'/AddProject',pathMatch:'full'
},
{
  path:'AddTask', component:TaskComponent
},
{
  path:'AddUser', component:UserComponent
},
{
  path:'AddProject', component:ProjectComponent
},
{
  path:'ViewTask', component:ViewTaskComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
