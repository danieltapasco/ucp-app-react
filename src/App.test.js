import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders Universidad Católica de Pereira", () => {
  render(<App />);
  const linkElement = screen.getByText(/¡Universidad Católica de Pereira !/i);
  expect(linkElement).toBeInTheDocument();
});
