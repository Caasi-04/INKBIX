import React from 'react';
import { render, screen } from '@testing-library/react';
import Products from '../../src/pages/Products';

describe('Products Page', () => {
  test('renders Products page heading', () => {
    render(<Products />);
    const headingElement = screen.getByText(/Products/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders product list', () => {
    render(<Products />);
    const productListElement = screen.getByTestId('product-list');
    expect(productListElement).toBeInTheDocument();
  });

  test('renders loading state initially', () => {
    render(<Products />);
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });
});