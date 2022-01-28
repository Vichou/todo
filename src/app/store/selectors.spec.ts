import {State} from './reducer';
import { selectTodo, selectTodos } from './selectors';

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

  it('should select todos list and sort them by closingTimestamp, isClosed and title', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(sortedTodos);
  });

  it('should select a specific todo based on it id', () => {
    selectTodos.projector(initialState);
    const todoId = 1;
    const result = selectTodo(todoId).projector(initialState);
    expect(result).toEqual(initialState.todos.find((todo) => todo.id === todoId))
  })
});


