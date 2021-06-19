import { Component, OnInit } from '@angular/core';

import { TaskService } from '../app/services/task.service';
import { ITask } from '../app/models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontToDoList';

  constructor() { }

}
