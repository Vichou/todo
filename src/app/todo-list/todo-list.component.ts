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

  todos$: Observable<Todo[]>

  loading$: Observable<boolean>;

  constructor(private store:Store) {
    this.todos$ = this.store.select(selectTodos);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(getTodos());
  }

  toggleTodo(todo: Todo) {
    this.store.dispatch(updateTodo({todo}));
  }

}
