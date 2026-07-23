import { render, screen } from '@testing-library/react';
import App from './App';

// api.js hace fetch al backend; lo simulamos para que el test no dependa de un servidor real.
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve([]),
    })
  );
});

test('renderiza el título de la bitácora', async () => {
  render(<App />);
  const title = await screen.findByText(/bitácora/i);
  expect(title).toBeInTheDocument();
});

test('muestra el mensaje de lista vacía cuando no hay tareas', async () => {
  render(<App />);
  const emptyMessage = await screen.findByText(/no hay tareas en esta vista/i);
  expect(emptyMessage).toBeInTheDocument();
});
