import {State} from './reducer';
import { selectTodos } from './selectors';

describe('Selectors', () => {
  const initialState: State = {
   todos: [
    { id: 1, title: 'todo1Title', isClosed: false },
    { id: 3, title: 'todo4Title', isClosed: true, },
    { id: 2, title: 'todo3Title', isClosed: true, },
    { id: 4, title: 'todo2Title', isClosed: false },
   ],
   isLoading: false,
  };

  it('should select todos list and sort them by closingTimestamp, isClosed and title', () => {
    const result = selectTodos.projector(initialState);
    expect(result).toEqual(initialState.todos);
  });
});


