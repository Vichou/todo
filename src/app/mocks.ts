import { Scenarios } from "data-mocks";

export const scenarios: Scenarios = {
    default: [
      {
        url: /todos/,
        method: 'GET',
        response: [
            { id: '1', title: 'Drink coffee', isClosed: true},
            { id: '2', title: 'Work... :(', isClosed: false},
            { id: '3', title: 'Little geek session!', isClosed: false}
        ],
        responseCode: 200,
        delay: 2000
      },
      {
        url: /todo/,
        method: 'PUT',
        response: {},
        responseCode: 200, 
        delay: 1000
      }
    ],
  };
  