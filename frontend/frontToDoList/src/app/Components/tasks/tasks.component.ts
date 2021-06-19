import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from '../../models/task.model';

import { SubSink } from 'SubSink';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  @Input() folder = null;
  tasksAll: ITask[];
  edit = false;
  editingTask: ITask;

  constructor(private taskService: TaskService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    if (this.folder != null) {
      this.subs.add(
        this.taskService.getTaskByFolder(this.folder.id).subscribe((res: ITask[]) => {
          this.tasksAll = res;
        })
      );
    } else {
      this.subs.add(
        this.taskService.getAllTasks().subscribe((res: ITask[]) => {
          this.tasksAll = res;
        })
      )
    }
  }


  checkComplete(task): void {
    const obj: ITask = {
      id: task.id,
      description: task.description,
      completed: task.completed === 0 ? 1 : 0,
      folderID: task.folderID
    };
    this.subs.add(
      this.taskService.putTask(obj).subscribe(_ => {
        this.openSnackBar('Task Update');
        this.loadTable();
      })
    )
  }

  onSubmit(): void {
    if ((document.getElementById('addTask') as HTMLFormElement).value != '') {
      const obj: ITask = {
        id: 0,
        description: (document.getElementById('addTask') as HTMLFormElement).value,
        completed: 0,
        folderID: this.folder ? this.folder.id : null
      };
      this.subs.add(
        this.taskService.putTask(obj).subscribe(_ => {
          this.openSnackBar('Task Added');
          this.loadTable();
          (document.getElementById('addTask') as HTMLFormElement).value = '';
        })
      )
    }
  }

  delTask(task: ITask): void {
    this.subs.add(
      this.taskService.deleteTask(task.id).subscribe(_ => {
        this.openSnackBar('Task Deleted');
        this.loadTable();
      })
    )
  }


  openSnackBar(message: string): void {
    this._snackBar.open(message, 'X', {
      duration: 3000
    });
  }

  editTask(task?): void {
    this.edit = !this.edit;
    this.edit ? this.editingTask = task : this.editingTask = null;
  }

  update(): void {
    if ((document.getElementById('updateTask') as HTMLFormElement).value != '') {
      const obj: ITask = {
        id: this.editingTask.id,
        description: (document.getElementById('updateTask') as HTMLFormElement).value,
        completed: this.editingTask.completed,
        folderID: this.editingTask.folderID
      };
      this.subs.add(
        this.taskService.putTask(obj).subscribe(_ => {
          this.openSnackBar('Task Updated');
          this.loadTable();
          (document.getElementById('updateTask') as HTMLFormElement).value = '';
          this.editTask();
        })
      )
    }
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
