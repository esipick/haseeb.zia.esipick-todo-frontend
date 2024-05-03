import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { taskList } from '../../models/task-list.model';
import { httpResponse } from '../../models/http-response.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private http: HttpClient) { }

  server: string = 'http://localhost:3000/';

getTasks() : Observable<any>{
  return this.http.get<any>(this.server+'get-tasks');
}

getTaskById() : Observable<any>{
  return this.http.get(this.server+'get-task');
}

addTask(obj: any) : Observable<any>{
  return this.http.post(this.server+'add-task', obj);
}

updateTask() : Observable<any>{
  return this.http.get(this.server+'update-task');
}

deleteTask() : Observable<any>{
  return this.http.get(this.server+'delete-task');
}

//  delete for bulk 

}
