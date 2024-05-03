import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud/crud.service';
import { taskList } from '../../models/task-list.model';
import { httpResponse } from '../../models/http-response.model';
import { MatSharedModule } from '../../shared/mat-shared/mat-shared.module';
import { MatDialog } from '@angular/material/dialog';
import { TodoActionsComponent } from '../todo-actions/todo-actions.component';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatSharedModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  numSelected: number = 0;
  numRows: number = 0;
  todoList: taskList[] = [];
  displayedColumns = ['select','todo', 'priority', 'status', 'percentage','actions'];


  constructor(private crud: CrudService, private dialog: MatDialog, private cdr: ChangeDetectorRef){}


ngOnInit(): void {
  this.getTodoList();  
}


getTodoList(){
  this.todoList = [
    {
      id:1,
      todo:'asd asd a sd a sd',
      priority:'high',
      status:'inProgress',
      percentage:10
  }
]
  // this.crud.getTasks().subscribe((data : httpResponse<taskList[]>)=>{
  //   if(!data.success){
  //     return;
  //   }
  //   this.todoList = data.data;
  // })
}

addTodo(){
  this.dialog.open(TodoActionsComponent,{
    width:'600px',
    data: null
  });
}

viewTodo(todo: taskList){

  this.dialog.open(TodoDetailComponent,{
    width:'600px',
    data:todo.id
  })

}
editTodo(todo: taskList){

}
deleteTodo(todo: taskList){

}

selection = new SelectionModel<taskList>(true, []);
isAllSelected(): boolean {
  this.numSelected = this.selection.selected.length;
  this.numRows = this.todoList.length;
  return this.numSelected === this.numRows;
}

masterToggle() {
  if (this.isAllSelected()) {
    this.selection.clear(); 
    this.numSelected = 0; 
  } else {
    this.todoList.forEach(row => this.selection.select(row));
  }
}

onSelection(e: any, row: any){
  setTimeout(() => {
    e ? this.selection.toggle(row) : null;
    this.numSelected = this.selection.selected.length;
    this.cdr.detectChanges();
  });
}
onMasterToggle() {
  setTimeout(() => {
    this.masterToggle();
    this.cdr.detectChanges();
  });
}
deleteSelectedFields() {
  this.selection.clear();
}


get priority(): typeof Priority {
  return Priority;
}

}

enum Priority{
  HIGHT = 'high',
  MEDIUM = 'meduim',
  LOW = 'low',
}