import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() folder = null;
  tasksAll: ITask[];
  edit = false;
  editingTask: ITask;

  constructor(private taskService: TaskService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable() {
    if (this.folder != null) {
      this.taskService.getTaskByFolder(this.folder.id).subscribe((res: ITask[]) => {
        this.tasksAll = res;
      })
    } else {
      this.taskService.getAllTasks().subscribe((res: ITask[]) => {
        this.tasksAll = res;
      })
    }

  }


  checkComplete(task) {
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
        folderID: this.folder ? this.folder.id : null
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

  editTask(task?) {
    this.edit = !this.edit;
    this.edit ? this.editingTask = task : this.editingTask = null;
  }

  update() {
    if ((document.getElementById('updateTask') as HTMLFormElement).value != '') {
      const obj: ITask = {
        id: this.editingTask.id,
        description: (document.getElementById('updateTask') as HTMLFormElement).value,
        completed: this.editingTask.completed,
        folderID: this.editingTask.folderID
      };
      this.taskService.putTask(obj).subscribe(_ => {
        this.openSnackBar('Task Updated');
        this.loadTable();
        (document.getElementById('updateTask') as HTMLFormElement).value = '';
        this.editTask();
      })
    }
  }
}
