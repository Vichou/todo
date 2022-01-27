import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/models/todo';

export const getTodos = createAction('[Todos] Get todos');

export const getTodosSuccess = createAction(
  '[Todos] Get todos success',
  props<{ todos: Todo[] }>()
);

export const getTodosFailed = createAction('[Todos] Get todos failed');

export const updateTodo = createAction(
  '[Todos] Update todo',
  props<{ todo: Todo }>(),
);

export const updateTodoSuccess = createAction(
  '[Todo] update todo success',
  props<{ todo: Todo }>(),
);

export const updateTodoFailed = createAction('[Todo] Update todo failed');