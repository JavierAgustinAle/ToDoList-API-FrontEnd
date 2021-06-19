import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksComponent } from './Components/tasks/tasks.component';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '**', component: TasksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
