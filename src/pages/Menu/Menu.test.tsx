import React from "react";
import { render, screen } from "@testing-library/react";
import { UserLogin } from "../../utils/types";
import { setItem } from "../../utils/localStorage";
import { MemoryRouter } from "react-router-dom";
import Menu from "./Menu.view";
import userEvent from "@testing-library/user-event";

describe("Menu component", () => {
  const userNotLogged: UserLogin = { id: 0, user: "", role: "" };
  const userLoginEmployee: UserLogin = {
    id: 2,
    user: "Presenter 2",
    role: "Employee",
  };
  const userLoginBoss: UserLogin = { id: 1, user: "Boss", role: "Boss" };
  let setCheckLogin: jest.Mock;

  beforeEach(() => {
    setCheckLogin = jest.fn();
    setItem("session", userLoginEmployee);
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("renders the Home link", () => {
    render(
      <MemoryRouter>
        <Menu setCheckLogin={setCheckLogin} userLogin={userLoginEmployee} />
      </MemoryRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("renders the Presenters link when user is logged in", () => {
    render(
      <MemoryRouter>
        <Menu setCheckLogin={setCheckLogin} userLogin={userLoginEmployee} />
      </MemoryRouter>
    );
    expect(screen.getByText("Presenters")).toBeInTheDocument();
  });

  test("does not render the Presenters link when user is not logged in", () => {
    render(
      <MemoryRouter>
        <Menu setCheckLogin={setCheckLogin} userLogin={userNotLogged} />
      </MemoryRouter>
    );
    expect(screen.queryByText("Presenters")).not.toBeInTheDocument();
  });

  test("renders the Tables link when user is logged in as Boss", () => {
    render(
      <MemoryRouter>
        <Menu setCheckLogin={setCheckLogin} userLogin={userLoginBoss} />
      </MemoryRouter>
    );
    expect(screen.getByText("Tables")).toBeInTheDocument();
  });

  test("does not render the Tables link when user is not logged in as Boss", () => {
    render(
      <MemoryRouter>
        <Menu setCheckLogin={setCheckLogin} userLogin={userLoginEmployee} />
      </MemoryRouter>
    );
    expect(screen.queryByText("Tables")).not.toBeInTheDocument();
  });

  test("renders the Schedule link when user is logged in", () => {
    render(
      <MemoryRouter>
        <Menu setCheckLogin={setCheckLogin} userLogin={userLoginEmployee} />
      </MemoryRouter>
    );
    expect(screen.getByText("Schedule")).toBeInTheDocument();
  });

  test("no renders the Close session button when user is logged out", () => {
    render(
      <MemoryRouter>
        <Menu setCheckLogin={setCheckLogin} userLogin={userNotLogged} />
      </MemoryRouter>
    );
    expect(
      screen.queryByRole("button", { name: "Close session" })
    ).not.toBeInTheDocument();
  });

  test("renders the Close session button when user is logged in", () => {
    render(
      <MemoryRouter>
        <Menu setCheckLogin={setCheckLogin} userLogin={userLoginEmployee} />
      </MemoryRouter>
    );
    expect(
      screen.queryByRole("button", { name: "Close session" })
    ).not.toBeInTheDocument();
  });

  test("logs the user out when clicking the Close session button", () => {
    render(
      <MemoryRouter>
        <Menu setCheckLogin={setCheckLogin} userLogin={userLoginEmployee} />
      </MemoryRouter>
    );
    userEvent.click(screen.getByRole("button", { name: "Close session" }));
    expect(setCheckLogin).toHaveBeenCalledWith(true);
    expect(localStorage.getItem("session")).toBe("{}");
  });
});
