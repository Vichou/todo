import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatestWith, filter, map, Observable } from 'rxjs';
import { Todo } from './models/todo';
import { getTodo } from './store/actions';
import { selectLoading, selectTodo } from './store/selectors';

@Injectable({
  providedIn: 'root',
})
export class UrlValidityGuard implements CanActivate {
  allowed: boolean = false;

  constructor(
    private router: Router,
    private store: Store
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    // Need to find a way to redirect all utl except the one described in route to /
    const id = +route.paramMap.get('todoId')!;
    this.store.dispatch(getTodo({ id }));
    isNaN(id) && this.router.navigateByUrl('/');
    return this.store.select(selectTodo(id)).pipe(
      combineLatestWith(this.store.select(selectLoading)),
      filter((array: Array<Todo | undefined | boolean>) => array[1] === false),
      map((result) => result[0] !== undefined ? true : this.router.parseUrl('/'))
    );
    
  }
}
