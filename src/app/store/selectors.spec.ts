import {State} from './reducer';
import { selectLoading, selectTodo, selectTodos } from './selectors';

describe('Selectors', () => {
  const initialState: State = {
   todos: [
    { id: 1, title: 'todo1Title', isClosed: false },
    { id: 2, title: 'todo2Title', isClosed: true, closingTimestamp: 45 },
    { id: 3, title: 'todo3Title', isClosed: true, closingTimestamp: 56 },
    { id: 4, title: 'todo4Title', isClosed: false },
   ],
   isLoading: false,
  };

  const sortedTodos = [
    { id: 4, title: 'todo4Title', isClosed: false },
    { id: 1, title: 'todo1Title', isClosed: false },
    { id: 2, title: 'todo2Title', isClosed: true, closingTimestamp: 45 },
    { id: 3, title: 'todo3Title', isClosed: true, closingTimestamp: 56 },
  ]

  it('should select todos list and sort them by closingTimestamp, isClosed and id', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(sortedTodos);
  });

  it('should return the loading state', () => {
    const result = selectLoading.projector(initialState);
    expect(result).toBeFalse();
  })

  it('should select a specific todo based on it id', () => {
    const todos = selectTodos.projector(initialState);
    const todoId = 1;
    const result = selectTodo(todoId).projector(todos);
    expect(result).toEqual(initialState.todos.find((todo) => todo.id === todoId))
  })
});


