import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponents } from 'ng-mocks';
import { State } from '../store/reducer';
import { selectTodo, selectTodos } from '../store/selectors';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {

  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let store: MockStore<State>;
  let mockTodosSelector;

  const fakeActivatedRoute = { snapshot: { paramMap: convertToParamMap({ todoId: 1 }) } };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailsComponent,
        MockComponents(
          MatCard,
          MatCardTitle,
          MatCardContent
        )
      ],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(selectTodos, [
      { id: 1, title: 'todo 1', description: 'a test description' , isClosed: false },
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should display a todo title', () => {
    expect(fixture.debugElement.query(By.css('mat-card-title')).nativeElement.innerText).toEqual('todo 1');
  })

  fit('should have the details of a todo', () => {
    expect(fixture.debugElement.query(By.css('span.description')).nativeElement.innerText).toEqual('a test description');
  });
});
