
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { UrlValidityGuard } from './url-validity.guard';


const routes: Routes = [
    { path: '', component: TodoListComponent, pathMatch: 'full' },  
    { path: 'todo', children: [
      { path: ':todoId', component: DetailsComponent, canActivate: [UrlValidityGuard]}
    ]}
];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  