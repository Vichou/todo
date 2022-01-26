import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/models/todo';

export const getTodos = createAction('[Todos] Load todos');

export const getTodosSuccess = createAction(
  '[Todos] Load todos success',
  props<{ todos: Todo[] }>()
);

export const getTodosFailed = createAction('[Todos] Load todos failed');