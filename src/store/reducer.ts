import {createReducer, on} from '@ngrx/store';
import { Todo } from 'src/app/models/todo';
import {getTodos, getTodosSuccess} from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: Array<Todo>;
  isLoading: boolean;
}

export const initialState: State = {
  todos: [],
  isLoading: true,
};

export const todosReducer = createReducer(
  initialState,
  on(
    getTodos,
    (state) => ({
      ...state,
      isLoading:true,
    })
  ),
  on(
    getTodosSuccess,
    (state, { todos }) => ({
      ...state,
      todos,
      isLoading: false,
    })
  ),
);

