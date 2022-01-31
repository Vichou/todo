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
    const id = +route.paramMap.get('todoId')!;
    isNaN(id) && this.router.navigateByUrl('/');
    this.store.dispatch(getTodo({ id }));
    return this.store.select(selectTodo(id)).pipe(
      combineLatestWith(this.store.select(selectLoading)),
      filter(([todo, isLoading]) => !!todo || isLoading === false),
      map(([todo, _]) =>todo !== undefined ? true : this.router.parseUrl('/'))
    );
  }
}
