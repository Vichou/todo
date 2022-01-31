import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo, TodoBase } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {}

  list(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.baseUrl}/todos`);
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${environment.baseUrl}/todos/${todo.id}`, todo);
  }

  get(todoId: number): Observable<Todo> {
    return this.http.get<Todo>(`${environment.baseUrl}/todos/${todoId}`);
  }

  exist(todoId: number) {
    return this.http.get<Todo>(`${environment.baseUrl}/todos/${todoId}`, { observe: 'response' });
  }

  add(todoBase: TodoBase): Observable<Todo> {
    const todo: Todo = { ...todoBase, isClosed: false, id: Date.now() }; 
    return this.http.post<Todo>(`${environment.baseUrl}/todos`, todo);
  }
}
