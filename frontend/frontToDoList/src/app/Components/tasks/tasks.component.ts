import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasksAll: ITask[];

  constructor(private taskService: TaskService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable() {
    this.taskService.getAllTasks().subscribe((res: ITask[]) => {
      this.tasksAll = res;
    })
  }


  update(task) {
    const obj: ITask = {
      id: task.id,
      description: task.description,
      completed: task.completed === 0 ? 1 : 0,
      folderID: task.folderID
    };
    this.taskService.putTask(obj).subscribe(_ => {
      this.openSnackBar('Task Update');
      this.loadTable();
    })
  }

  onSubmit() {
    if ((document.getElementById('addTask') as HTMLFormElement).value != '') {
      const obj: ITask = {
        id: 0,
        description: (document.getElementById('addTask') as HTMLFormElement).value,
        completed: 0,
        folderID: null
      };
      this.taskService.putTask(obj).subscribe(_ => {
        this.openSnackBar('Task Added');
        this.loadTable();
        (document.getElementById('addTask') as HTMLFormElement).value = '';
      })
    }
  }

  delTask(task: ITask) {
    this.taskService.deleteTask(task.id).subscribe(_ => {
      this.openSnackBar('Task Deleted');
      this.loadTable();
    })
  }


  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 3000
    });
  }
}
