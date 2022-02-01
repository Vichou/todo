import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { Effects } from './effects';
import { todosReducer } from './reducer';
import { Todo, TodoBase } from '../models/todo';
import { cold, hot } from 'jasmine-marbles';
import { createTodo, createTodoFailed, createTodoSuccess, getTodo, getTodoFailed, getTodos, getTodosFailed, getTodosSuccess, getTodoSuccess, updateTodo, updateTodoFailed, updateTodoSuccess } from './actions';


describe('Effects', () => {
  let effects: Effects;
  let actions$: Observable<Actions>;
  const todoService = jasmine.createSpyObj<TodoService>('TodoService', [
    'list',
    'update',
    'get',
    'add',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ todosStore: todosReducer })],
      providers: [
        Effects,
        provideMockActions(() => actions$),
        {
          provide: TodoService,
          useValue: todoService,
        },
      ],
    });

    effects = TestBed.inject(Effects);
  });

  describe('getTodos$', () => {
      fit('should dispatch getTodosSuccess action when todoService.list return a result', () => {
        const mockedTodos: Todo[] = [{ id:1, title: 'aTitle', isClosed: true, closingTimestamp: 1642498223 }];
        todoService.list.and.returnValue(of(mockedTodos));

        actions$ = hot('-a-', {
            a: getTodos(),
        });
        const expected = cold('-b-', {
            b: getTodosSuccess({todos: mockedTodos})
        });

        expect(effects.getTodos$).toBeObservable(expected);
      });

    fit('should dispatch getTodosFailed when todoService.list call fails', () => {
      todoService.list.and.returnValue(cold('#'));

      actions$ = hot('-a-', {
        a: getTodos(),
      });

      const expected = cold('-b-', {
        b: getTodosFailed(),
      });

      expect(effects.getTodos$).toBeObservable(expected);
    })
  })

  describe('updateTodo$', () => {
    fit('should dispatch updateTodoSuccess when todoService.update call succeeds', () => {
      const mockedTodo: Todo = { id: 1, title: 'aTitle', isClosed: true, closingTimestamp: 1642498223 };
      todoService.update.and.returnValue(of(mockedTodo));

      actions$ = hot('-a-', {
        a: updateTodo({todo: mockedTodo}),
      });
      const expected = cold('-b-', {
        b: updateTodoSuccess({todo: { ...mockedTodo, isClosed: true, }})
      });

      expect(effects.updateTodo$).toBeObservable(expected);
    });

    fit('should dispatch updateTodoFailed when todoSevice.update call fails', () => {
      const mockedTodo: Todo = { id: 1, title: 'aTitle', isClosed: true, closingTimestamp: 1642498223 };

      todoService.update.and.returnValue(cold('#'));

      actions$ = hot('-a-', {
        a: updateTodo({todo: mockedTodo}),
      });

      const expected = cold('-b-', {
        b: updateTodoFailed(),
      });

      expect(effects.updateTodo$).toBeObservable(expected);
    })
  });

  describe('getTodo$', () => {
    fit('should dispatch getTodoSuccess action when todoService.get call succeeds', () => {
      const mockedTodo: Todo = { id: 1, title: 'aTitle', isClosed: true, closingTimestamp: 1642498223 };
      todoService.get.and.returnValue(of(mockedTodo));

      actions$ = hot('-a-', {
        a: getTodo({ id: mockedTodo.id })
      });

      const expected = cold('-b-', {
        b: getTodoSuccess({todo: mockedTodo}),
      });

      expect(effects.getTodo$).toBeObservable(expected);
    });

    fit('should dispatch getTodoFailed action when todoService.get call fails', () => {
      const mockedTodo: Todo = { id: 1, title: 'aTitle', isClosed: true, closingTimestamp: 1642498223 };
      todoService.get.and.returnValue(cold('#'));

      actions$ = hot('-a-', {
        a: getTodo({ id: mockedTodo.id })
      });

      const expected = cold('-b-', {
        b: getTodoFailed(),
      });

      expect(effects.getTodo$).toBeObservable(expected);
    });
  });

  describe('createTodo$', () => {
    fit('should dispatch createTodoSuccess when todoService.add call succeeds', () => {
      const mockedTodoBase: TodoBase = { title: 'a title', description: 'a description' };
      const mockedTodo: Todo = {...mockedTodoBase, id: 1, isClosed: false };

      todoService.add.and.returnValue(of(mockedTodo));

      actions$ = hot('-a-', {
        a: createTodo({ todoBase: mockedTodoBase }),
      });

      const expected = cold('-b-', {
        b: createTodoSuccess({ todo: mockedTodo }),
      });

      expect(effects.createTodo$).toBeObservable(expected);
    });

    fit('should dispatch createTodoFailed when todoService.add call failed', () => {
      const mockedTodoBase: TodoBase = { title: 'a title', description: 'a description' };
      todoService.add.and.returnValue(cold('#'));

      actions$ = hot('-a-', {
        a: createTodo({ todoBase: mockedTodoBase }),
      });

      const expected = cold('-b-', {
        b: createTodoFailed(),
      });

      expect(effects.createTodo$).toBeObservable(expected);
    })
  })
});
