import {createFeatureSelector, createSelector} from '@ngrx/store';
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

      return a.title.localeCompare(b.title);
    }),
);

export const selectLoading = createSelector(
  getState,
  (state) => state.isLoading,
)
