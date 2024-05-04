import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { taskList } from '../../models/task-list.model';
import { httpResponse } from '../../models/http-response.model';
import { objToParams } from '../../shared/http-utils/objToParama';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private http: HttpClient) { }

  server: string = 'http://localhost:3000/';

getTasks(obj: any) : Observable<any>{

  let queryParams = objToParams(obj);
  return this.http.get<any>(this.server+'get-tasks'+queryParams);
}

getTaskById(id: number) : Observable<any>{
  return this.http.get(this.server+`get-task/${id}`);
}

addTask(obj: any) : Observable<any>{
  return this.http.post(this.server+'add-task', obj);
}

updateTask(obj: any) : Observable<any>{
  return this.http.post(this.server+'update-task', obj);
}

deleteTask(todoIds: any[]) : Observable<any>{
  return this.http.post(this.server+'delete-task',todoIds);
}


}
