import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getTodos, getTodosFailed, getTodosSuccess, updateTodo, updateTodoFailed, updateTodoSuccess } from './actions';
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
        )}
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      map(({todo}) => {
        const updatedTodo = {...todo};
        const status = updatedTodo.isClosed;
        if (status) {
          updatedTodo.closingTimestamp = undefined;
        } else {
          updatedTodo.closingTimestamp = Date.now();
        }
        updatedTodo.isClosed = !status;
        return updatedTodo;
      }),
      switchMap((todo) => {
        return this.todoService.update(todo).pipe(
          map(() => updateTodoSuccess({todo})),
          catchError(() => [updateTodoFailed()]),
        )
      })
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}

}
