import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("show correct text", () => {
    localStorage.setItem("session", JSON.stringify({}));
    render(<App />);
    const linkElement = screen.getByText(/Welcome to React Schedule/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders the menu component", () => {
    localStorage.setItem("session", JSON.stringify({}));
    render(<App />);
    expect(screen.getByTestId("menu")).toBeInTheDocument();
  });

  test("renders the home page component", () => {
    localStorage.setItem("session", JSON.stringify({}));
    render(<App />);
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  test("renders presenters page for user with Boss role", () => {
    const user = { user: "Boss", role: "Boss" };
    localStorage.setItem("session", JSON.stringify(user));
    render(<App />);
    const presentersPageElement = screen.getByText(/Presenters/i);
    expect(presentersPageElement).toBeInTheDocument();
  });

  test("renders menu with correct user name", () => {
    const user = { user: "Boss", role: "Boss" };
    localStorage.setItem("session", JSON.stringify(user));
    render(<App />);
    const userNameElement = screen.getByText(/Boss/i);
    expect(userNameElement).toBeInTheDocument();
  });
});
