import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App with a classname App', () => {
  const { container } = render(<App />);
  expect(container.querySelector('div')).toHaveClass('App');
});
