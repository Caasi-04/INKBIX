import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders Vite + React heading', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const headingElement = screen.getByText(/Vite \+ React/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders count button', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const buttonElement = screen.getByRole('button', { name: /count is/i });
  expect(buttonElement).toBeInTheDocument();
});