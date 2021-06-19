import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // Url
  protected tasksAll = environment.URL;
  protected tasksSingle = environment.URL + '/{id}';


  constructor(private httpClient: HttpClient) { }



  getAllTasks(): Observable<any> {
    return this.httpClient.get(this.tasksAll);
  }

  getTaskById(id: number): Observable<any> {
    return this.httpClient.get(this.tasksSingle.replace('{id}', id.toString()));
  }

  deleteTask(id: number) {
    return this.httpClient.delete(this.tasksSingle.replace('{id}', id.toString()));
  }

  putTask(obj: ITask) {
    return this.httpClient.put(this.tasksAll, obj);
  }



}
