import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud/crud.service';
import { taskList } from '../../models/task-list.model';
import { httpResponse } from '../../models/http-response.model';
import { MatSharedModule } from '../../shared/mat-shared/mat-shared.module';
import { MatDialog } from '@angular/material/dialog';
import { TodoActionsComponent } from '../todo-actions/todo-actions.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatSharedModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  todoList: taskList[] = [];
  constructor(private crud: CrudService, private dialog: MatDialog){}


ngOnInit(): void {
  this.getTodoList();  
}


getTodoList(){
  this.crud.getTasks().subscribe((data : httpResponse<taskList[]>)=>{
    if(!data.success){
      return;
    }
    this.todoList = data.data;
  })
}

addTodo(){
  this.dialog.open(TodoActionsComponent,{
    width:'600px',
    data: null
  });
}


}
