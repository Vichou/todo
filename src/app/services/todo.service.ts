import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {}

  list(): Observable<Todo[]> {
    console.log("[Todo Service] getting todo list");
    return this.http.get<Todo[]>(`${environment.baseUrl}/todos`);
  }

  update(todo: Todo): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/todo`, todo);
  }
}
