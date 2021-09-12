import horse from '../features/horses/horses.slice';
import { Status } from '../interfaces/status.enum';
import { render, screen, waitFor } from '@testing-library/react';

import { setupServer } from 'msw/node';
import Horses from '../features/horses/horse-list.page';

import { handlers } from './mocks/handler';
import { BrowserRouter } from 'react-router-dom';
import store from '../app/store';
import { Provider } from 'react-redux';

const server = setupServer(...handlers);
// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

const MockHorses = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Horses />
      </BrowserRouter>
    </Provider>
  );
};
describe('Testing horse listing page', () => {
  test('should return the initial state', () => {
    expect(horse(undefined, {})).toEqual({
      horses: [],
      status: Status.INIT,
    });
  });
  test('fetches & receives horses', async () => {
    render(<MockHorses />);
    expect(screen.queryByText(/Loading\.\.\./i)).toBeInTheDocument();
    await waitFor(() => screen.getByText('Thunderdash'));
  });

  test('Pagination for horses with greater than 10 ', async () => {
    render(<MockHorses />);
    expect(screen.queryByText(/Next/i)).toBeInTheDocument();
    expect(screen.queryByText(/Previous/i)).toBeInTheDocument();
  });
});
