import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createTodo,
  createTodoFailed,
  createTodoSuccess,
  getTodo,
  getTodoFailed,
  getTodos,
  getTodosFailed,
  getTodosSuccess,
  getTodoSuccess,
  updateTodo,
  updateTodoFailed,
  updateTodoSuccess,
} from './actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { TodoService } from 'src/app/services/todo.service';

@Injectable()
export class Effects {
  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTodos),
      mergeMap(() => {
        return this.todoService.list().pipe(
          map((todos) => getTodosSuccess({ todos })),
          catchError(() => [getTodosFailed()])
        );
      })
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      map(({ todo }) => {
        const status = todo.isClosed;
        const closingTimestamp = status ? undefined : Date.now();
        return { ...todo, isClosed: !status, closingTimestamp };
      }),
      switchMap((todo) => {
        return this.todoService.update(todo).pipe(
          map((updatedTodo) => updateTodoSuccess({ todo: updatedTodo })),
          catchError(() => [updateTodoFailed()])
        );
      })
    )
  );

  getTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTodo),
      switchMap(({ id }) =>
        this.todoService.get(id).pipe(
          map((todo) => getTodoSuccess({ todo })),
          catchError(() => [getTodoFailed()])
        )
      )
    )
  );

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTodo),
      switchMap(({ todoBase }) =>
        this.todoService.add(todoBase).pipe(
          map((todo) => createTodoSuccess({ todo })),
          catchError(() => [createTodoFailed()])
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
