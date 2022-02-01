import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getTodos, updateTodo } from 'src/app/store/actions';
import { selectLoading, selectTodos } from 'src/app/store/selectors';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos$ = this.store.select(selectTodos);

  loading$ = this.store.select(selectLoading);

  constructor(private store:Store) {}

  ngOnInit(): void {
    this.store.dispatch(getTodos());
  }

  toggleTodo(todo: Todo) {
    this.store.dispatch(updateTodo({todo}));
  }

}
