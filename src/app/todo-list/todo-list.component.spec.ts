import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from 'src/app/store/reducer';
import { selectTodos } from 'src/app/store/selectors';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import {MockComponents} from 'ng-mocks';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore<State>;
  let mockTodosSelector;

  const fakeActivatedRoute = { snapshot: { paramMap: convertToParamMap({todoId: 1})}}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
          MockComponents(
          MatCheckbox,
          MatListItem,
          MatList,
          MatCardContent,
          MatCardTitle,
          MatCard
        ),
      ],
      imports: [FormsModule],
      providers: 
        [provideMockStore(),
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(selectTodos, [
      { id: 1, title: 'todo 1', isClosed: false },
      { id: 2, title: 'todo 2', isClosed: true },
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', () => {
    expect(fixture.debugElement.query(By.css('mat-card-title')).nativeElement.innerText).toEqual('What am I going to do today...');
  });

  it('should display todos', () => {
    const todoElements = fixture.debugElement.queryAll(By.css('mat-list mat-list-item'));
    expect(todoElements.length).toEqual(2);
    expect(todoElements[0].query(By.css('h4')).nativeElement.innerText).toContain('todo 1');
    expect(todoElements[1].query(By.css('h4')).nativeElement.innerText).toContain('todo 2');
    //const todoCheckboxes = todoElements.map(item => item.query(By.css('mat-checkbox')).componentInstance);
    const todoCheckboxes = fixture.debugElement.queryAll(By.css('mat-checkbox'));
    const checkbox1 = todoCheckboxes[0].componentInstance;
    const checkbox2 = todoCheckboxes[1].componentInstance;
    expect(checkbox1.checked).toBeFalse();
    expect(checkbox2.checked).toBeTrue();
  });

});
