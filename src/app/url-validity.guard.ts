import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTodo } from 'src/app/store/selectors';

@Injectable({
  providedIn: 'root',
})
export class UrlValidityGuard implements CanActivate {
  allowed: boolean = false;

  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const todo$ = this.store.select(selectTodo(+route.paramMap.get('todoId')!));
    todo$.subscribe({
      next: (todo) => {
        this.allowed = !!todo;
      },
    });
    return this.allowed ? true : this.router.navigateByUrl('/');
  }
}
