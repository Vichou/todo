import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getTodos, getTodosFailed, getTodosSuccess } from './actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodoService } from 'src/app/services/todo.service';


@Injectable()
export class Effects {
  loadTodos$ = createEffect(() =>
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

  constructor(private actions$: Actions, private todoService: TodoService) {}

}
