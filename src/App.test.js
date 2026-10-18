import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders College Availability Finder heading and title', () => {
  render(<App />);
  expect(screen.getByText(/SEARCH IN ONE Web-Page!/i)).toBeInTheDocument();
  expect(screen.getByText(/College Availability Finder/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Cut-off \/ SHOW COLLEGES/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /^search$/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /clear search/i })).toBeInTheDocument();
});

test('shows message when search is clicked with empty input', () => {
  render(<App />);
  const searchButton = screen.getByRole('button', { name: /^search$/i });
  fireEvent.click(searchButton);
  expect(
    screen.getByText(/Please enter your cut-off or type 'show colleges'./i)
  ).toBeInTheDocument();
});

test('shows error when invalid cut-off is entered', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Cut-off \/ SHOW COLLEGES/i);
  fireEvent.change(input, { target: { value: 'abc' } });
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));
  expect(screen.getByText(/Please enter a valid cut-off./i)).toBeInTheDocument();
});

test('displays all colleges when typing "show colleges"', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Cut-off \/ SHOW COLLEGES/i);
  fireEvent.change(input, { target: { value: 'show colleges' } });
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));
  expect(screen.getByText('All Colleges')).toBeInTheDocument();
  expect(screen.getByText(/PSG Tech/i)).toBeInTheDocument();
  expect(screen.getByText(/Anna University/i)).toBeInTheDocument();
});

test('filters colleges matching cut-off and sorts descending', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Cut-off \/ SHOW COLLEGES/i);
  fireEvent.change(input, { target: { value: '185' } });
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));
  expect(screen.getByText('Colleges Available')).toBeInTheDocument();
  expect(screen.getByText(/Kumaraguru/i)).toBeInTheDocument();
  expect(screen.queryByText(/PSG Tech/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/SRM/i)).not.toBeInTheDocument();
});

test('clears search input and results on clear button click', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Cut-off \/ SHOW COLLEGES/i);
  fireEvent.change(input, { target: { value: 'show colleges' } });
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));
  expect(screen.getByText('All Colleges')).toBeInTheDocument();

  const clearButton = screen.getByRole('button', { name: /clear search/i });
  fireEvent.click(clearButton);
  expect(input.value).toBe('');
  expect(screen.queryByText('All Colleges')).not.toBeInTheDocument();
});

