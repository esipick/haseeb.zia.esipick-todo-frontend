import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    {
        path:'',
        component: LayoutComponent,
        children:[
            {
             path:'',
             component:TodoListComponent   
            }
        ]
    }
];
