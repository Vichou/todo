import * as fromReducer from './reducer';
import { State } from './reducer';
import {
  createTodoSuccess,
  getTodosSuccess,
  getTodoSuccess,
  updateTodoSuccess,
} from './actions';

describe('Reducer', () => {
  describe('unknown action', () => {
    fit('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('getTodosSuccess action', () => {
    fit('should retrieve all todos and update the state', () => {
      const { initialState } = fromReducer;
      const newState: State = {
        todos: [{ id: 1, title: 'aTitle', isClosed: false }],
        isLoading: false,
      };
      const action = getTodosSuccess({
        todos: [...newState.todos],
      });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('getTodoSuccess', () => {
    fit('should retrieve a single todo and update the state', () => {
      const { initialState } = fromReducer;
      const newState: State = {
        todos: [{ id: 1, title: 'aTitle', isClosed: false }],
        isLoading: false,
      };
      const action = getTodoSuccess({ todo: newState.todos[0] });

      const state = fromReducer.todosReducer(initialState, action);
      expect(state).toEqual(newState);
    });
  });

  describe('updateTodoSuccess', () => {
    fit('should retrieve the updated todo and update the state accordingly', () => {
      const { initialState } = fromReducer;
      const newState: State = {
        todos: [{ id: 1, title: 'aTitle', isClosed: false }],
        isLoading: false,
      };
      const action = updateTodoSuccess({ todo: newState.todos[0] });

      const state = fromReducer.todosReducer(initialState, action);
      expect(state).toEqual(newState);
    });
  });

  describe('createTodoSuccess', () => {
    fit('should retrieve the newly created todo and update the state accordingly', () => {
      const { initialState } = fromReducer;
      const newState: State = {
        todos: [{ id: 1, title: 'aTitle', isClosed: false }],
        isLoading: false,
      };
      const action = createTodoSuccess({ todo: newState.todos[0] });

      const state = fromReducer.todosReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });
});
