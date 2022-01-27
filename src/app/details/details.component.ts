import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getTodo } from 'src/store/actions';
import { selectLoading, selectTodo } from 'src/store/selectors';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  loading$: Observable<boolean>;
  
  todoId: number | null = null;

  todo$: Observable<Todo | undefined>;

  constructor(private store:Store, private route: ActivatedRoute) {
    this.todoId = +this.route.snapshot.paramMap.get("todoId")!;
    this.todo$ = this.store.select(selectTodo(this.todoId!));
    this.loading$ = this.store.select(selectLoading);

   }

  ngOnInit(): void {
    
    this.store.dispatch(getTodo({ id: this.todoId! }));
  }

}
