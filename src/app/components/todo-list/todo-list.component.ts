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
import { CommonModule } from '@angular/common';
import { getListParams } from '../../models/get-list-params';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatSharedModule,CommonModule,InfiniteScrollModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  numSelected: number = 0;
  numRows: number = 0;
  getListParams : getListParams = new getListParams();
  todoList: taskList[] = [];
  displayedColumns = ['select','todo', 'priority', 'status', 'percentage','actions'];


  constructor(private crud: CrudService, private dialog: MatDialog, private cdr: ChangeDetectorRef){}


ngOnInit(): void {
  this.getTodoList();  
}


getTodoList(){
  
  if(this.getListParams.page == 1){
    this.todoList = [];
  }
  this.crud.getTasks(this.getListParams).subscribe((data : httpResponse<taskList[]>)=>{
    if(!data.success){
      return;
    }
    this.todoList = [...this.todoList, ...data.data];
  })
}

onScroll(){
  this.getListParams.page += 1;
  this.getTodoList();  
}

sortData(event: any) {
  this.getListParams = new getListParams();
  event.direction = event.direction || 'asc'
  this.getListParams.sortBy = event.active;
  this.getListParams.sortDirection = event.direction;
  
  this.getTodoList(); 
}

addTodo(){
  this.dialog.open(TodoActionsComponent,{
    width:'600px',
    data: null
  }).afterClosed().subscribe((data)=>{
    if(data){
      this.resetLisit();
    }
  });
}
resetLisit(){
  this.getListParams = new getListParams();
  this.getTodoList();
}
viewTodo(todo: taskList){

  this.dialog.open(TodoDetailComponent,{
    width:'600px',
    data:todo.id
  })

}
editTodo(todo: taskList){

this.dialog.open(TodoActionsComponent,{
  width:'600px',
  data: todo
}).afterClosed().subscribe((data)=>{
  if(data){
    this.resetLisit();
  }
})

}


selection = new SelectionModel<taskList>(true, []);
isAllSelected(): boolean {
  this.numRows = this.todoList.length;
  return this.numSelected === this.numRows;
}

masterToggle() {
  if (this.isAllSelected()) {
    this.selection.clear(); 
  } else {
    this.todoList.forEach(row => this.selection.select(row));
  }
  this.count();
}

onSelection(e: any, row: any){
  setTimeout(() => {
    e ? this.selection.toggle(row) : null;
    this.count();
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
  let todoIds = this.selection.selected.map(selectedRow => selectedRow.id);

  this.crud.deleteTask(todoIds).subscribe((data: httpResponse<any>)=>{
    if(!data.success){
      return;
    }
  })
  this.selection.clear();
  this.resetLisit()
  this.count();
}

count(){
  this.numSelected = this.selection.selected.length;
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