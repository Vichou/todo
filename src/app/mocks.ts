import { Scenarios } from 'data-mocks';

export const scenarios: Scenarios = {
  default: [
    {
      url: /todos/,
      method: 'GET',
      response: [
        {
          id: 1,
          title: 'Drink coffee',
          description: 'Nespresso, What Else?',
          isClosed: true,
        },
        {
          id: 2,
          title: 'Work... :(',
          description: 'Need to finish todo list app!!!',
          isClosed: false,
        },
        {
          id: 3,
          title: 'Little geek session!',
          description: 'Need to ask the boys about starting time...s',
          isClosed: false,
        },
      ],
      responseCode: 200,
      delay: 2000,
    },
    {
      url: /todo/,
      method: 'PUT',
      response: {},
      responseCode: 200,
      delay: 1000,
    },
    {
      url: /todo\/1/,
      method: 'GET',
      response: {
        id: 1,
        title: 'Drink coffee',
        description: 'Nespresso, What Else?',
        isClosed: true,
      },
      responseCode: 200,
      delay: 1000,
    },
    {
      url: /todo\/2/,
      method: 'GET',
      response: {
        id: 2,
        title: 'Work... :(',
        description: 'Need to finish todo list app!!!',
        isClosed: false,
      },
      responseCode: 200,
      delay: 2000,
    },
    {
      url: /todo\/3/,
      method: 'GET',
      response: {
        id: 3,
        title: 'Little geek session!',
        description: 'Need to ask the boys about starting time...',
        isClosed: false,
      },
      responseCode: 200,
      delay: 2000,
    },
  ],
};
