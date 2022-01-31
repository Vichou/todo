import {createReducer, on} from '@ngrx/store';
import { Todo } from 'src/app/models/todo';
import {createTodoSuccess, getTodo, getTodoFailed, getTodos, getTodosSuccess, getTodoSuccess, updateTodo, updateTodoSuccess} from './actions';

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
  
  on(
    updateTodo,
    (state) => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    updateTodoSuccess,
    (state, { todo: updatedTodo }) => ({
      ...state,
      todos: [
        ...state.todos.filter(todo => todo.id !== updatedTodo.id),
        updatedTodo
      ],
      isLoading: false,
    })
  ),
  on(
    getTodo,
    (state) => ({
      ...state,
      ...state.todos,
      isLoading: true,
    })
  ),
  on(
    getTodoSuccess,
    (state, { todo }) => ({
      ...state,
      todos: [
        todo
      ],
      isLoading: false
    })
  ),
  on(getTodoFailed, 
    (state) => ({
      ...state,
      isLoading: false,
    })
  ),
  on(createTodoSuccess,
    (state, {todo}) => ({
      ...state,
      todos: [
        ...state.todos,
        todo
      ],
      isLoading: false,
    })
  )
);

