import React from 'react';
import { render, screen } from '@testing-library/react';

import Loading from '../components/common/loading';

describe('Renders Loading Component', () => {
  test('renders loading component', () => {
    render(<Loading />);
    expect(screen.getByText(/Loading\.\.\./i)).toBeInTheDocument();
  });
});
