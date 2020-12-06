import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders upload form button for main page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Upload Form/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders display form button for main page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Display Form/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders delete form button for main page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Delete Form/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders update form button for main page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Update Form/i);
  expect(linkElement).toBeInTheDocument();
});