import horse from '../features/horses/horses.slice';
import { Status } from '../interfaces/status.enum';
import { render, screen, waitFor } from '@testing-library/react';
import { Route, MemoryRouter } from 'react-router-dom';

import { setupServer } from 'msw/node';

import { handlers } from './mocks/handler';
import { BrowserRouter } from 'react-router-dom';
import store from '../app/store';
import { Provider } from 'react-redux';
import HorseDetailPage from '../features/horses/horse-detail.page';

const server = setupServer(...handlers);
// Enable API mocking before tests.
beforeAll(() => {
  server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
const horseId = '90740010-ee4e-418c-8de4-4c4a5a2817aa';
const MockHorseDetailPage = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MemoryRouter initialEntries={[`/horse/${horseId}`]}>
          <Route path="/horse/:horseId">
            <HorseDetailPage />
          </Route>
        </MemoryRouter>
      </BrowserRouter>
    </Provider>
  );
};

describe('Testing horse Detail page', () => {
  test('should return the initial state', () => {
    expect(horse(undefined, {})).toEqual({
      horses: [],
      status: Status.INIT,
    });
  });
  test('fetch & receives horse Details', async () => {
    render(<MockHorseDetailPage />);

    expect(screen.queryByText(/Name/i)).toBeInTheDocument();
    expect(screen.queryByText(/Favourite Food/i)).toBeInTheDocument();
    expect(screen.queryByText(/Height/i)).toBeInTheDocument();
    expect(screen.queryByText(/Weight/i)).toBeInTheDocument();
    await waitFor(() => screen.getByText('Thunderdash'));
    expect(screen.queryByText(/Hot Chips/i)).toBeInTheDocument();
  });

  test('Verify Horses state is empty ', async () => {
    const horse = store.getState().horse.horses?.find((horse) => horse.id === horseId);
    await waitFor(() => expect(horse).toBeUndefined());
  });
});
