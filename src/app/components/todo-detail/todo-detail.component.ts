import { Component, Inject, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud/crud.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { httpResponse } from '../../models/http-response.model';
import { taskList } from '../../models/task-list.model';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [NgxSkeletonLoaderModule,CommonModule],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss'
})
export class TodoDetailComponent implements OnInit {
  todoDetail: taskList = new taskList();
  isLoading : boolean = true;
  constructor(
    private crud: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TodoDetailComponent>
   ){}

ngOnInit(): void {
  this.getTodoById();  
}

getTodoById(){
  this.todoDetail = {
      id:1,
      todo:'asd asd a sd a sd',
      priority:'high',
      status:'inProgress',
      percentage:10
  };

  this.crud.getTaskById(this.data).subscribe((data: httpResponse<any>)=>{
  this.isLoading = false;
    if(data.success){
      this.todoDetail = data.data;
    }
  })
}

close(){
  this.dialogRef.close();
}

get priority(): typeof Priority {
  return Priority;
}

get status(): typeof Status {
  return Status;
}
}

enum Priority{
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

enum Status{
  TODO = 'todo',
  INPROGRESS = 'inProgress',
  DONE = 'done',
}