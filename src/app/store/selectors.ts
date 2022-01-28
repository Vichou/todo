import {createFeatureSelector, createSelector} from '@ngrx/store';
import { Todo } from 'src/app/models/todo';
import {featureKey, State} from './reducer';

export const getState = createFeatureSelector<State>(featureKey);

export const selectTodos = createSelector(
    getState,
    (state: State) => [...state.todos].sort((a,b) => {
      if (a.closingTimestamp && b.closingTimestamp) {
        return a.closingTimestamp - b.closingTimestamp;
      }

      if (a.isClosed || b.isClosed) {
        return a.isClosed ? 1 : -1
      }

      return b.id - a.id;
    }),
);

export const selectLoading = createSelector(
  getState,
  (state) => state.isLoading,
)

export const selectTodo = (id:number) => createSelector(selectTodos, (todos:Todo[]) => todos.find((todo) => todo.id === id));

