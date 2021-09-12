import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/common/header';
import { BrowserRouter } from 'react-router-dom';
const MockHeader = () => {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

describe('Renders Header Component', () => {
  test('renders header with Application title', () => {
    render(<MockHeader />);
    const titleElement = screen.getByText(/FirstAML App/i);
    expect(titleElement).toBeInTheDocument();
  });
  test('renders horses link ', () => {
    render(<MockHeader />);
    const linkElement = screen.getByText(/Horses/i);
    expect(linkElement).toBeInTheDocument();
  });
});
