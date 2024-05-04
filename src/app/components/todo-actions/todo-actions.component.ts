import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudService } from '../../services/crud/crud.service';
import { httpResponse } from '../../models/http-response.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { taskList } from '../../models/task-list.model';

@Component({
  selector: 'app-todo-actions',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-actions.component.html',
  styleUrl: './todo-actions.component.scss'
})
export class TodoActionsComponent implements OnInit {
  addTodo : FormGroup = new FormGroup({});
constructor(private fb: FormBuilder,
   private crud: CrudService,
   @Inject(MAT_DIALOG_DATA) public data: taskList,
   private dialogRef: MatDialogRef<TodoActionsComponent>
  ){}

ngOnInit(): void {
  this.addFormInit();
  if(this.data){
    this.fillForm();
  }  
}

fillForm(){
  this.addTodo.get('todo')?.setValue(this.data.todo);
  this.addTodo.get('priority')?.setValue(this.data.priority);
  this.addTodo.get('status')?.setValue(this.data.status);
  this.addTodo.get('percentage')?.setValue(this.data.percentage);
}

addFormInit(){
this.addTodo = this.fb.group({
  todo:['',[Validators.required]],
  priority:['',[Validators.required]],
  status:['',[Validators.required]],
  percentage:['',[Validators.required]],
});
}

submit(){
  this.crud.addTask(this.addTodo.value).subscribe((data:httpResponse<any>)=>{

    if(data.success){
      this.dialogRef.close(true);
    }

  })
}

edit(){
  let obj = {id:this.data.id, ...this.addTodo.value}
  this.crud.updateTask(obj).subscribe((data:httpResponse<any>)=>{

    if(data.success){
      this.dialogRef.close(true);
    }

  })
}

get getControls(){
  return this.addTodo.controls;
}

}
