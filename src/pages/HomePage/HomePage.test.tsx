import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage.view";
import { RoleType, Shift } from "../../utils/types";

const presenters = [
  {
    id: 2,
    name: "Presenter 2",
    role: RoleType.Employee,
    available: true,
    address: "Address 22...",
    phone: "622222222",
    priority: Shift.Morning,
    askedFreeDay: false,
  },
  {
    id: 3,
    name: "Presenter 3",
    role: RoleType.Employee,
    available: true,
    address: "Address 3...",
    phone: "633333333",
    priority: Shift.Night,
    askedFreeDay: false,
  },
  {
    id: 4,
    name: "Presenter 4",
    role: RoleType.Employee,
    available: true,
    address: "Address 4...",
    phone: "644444444",
    priority: Shift.Any,
    askedFreeDay: false,
  },
];

const userNotLogged = { id: 0, user: "", role: "" };
const userLoginEmployee = { id: 2, user: "Presenter 2", role: "Employee" };
const userLoginBoss = { id: 1, user: "Boss", role: "Boss" };

const setCheckLogin = jest.fn();

describe("HomePage component", () => {
  test("renders homepage component", () => {
    render(
      <HomePage
        presenters={presenters}
        userLogin={userLoginEmployee}
        setCheckLogin={setCheckLogin}
      />
    );
    const homePageElement = screen.getByTestId("home-page");
    expect(homePageElement).toBeInTheDocument();
  });

  test("renders welcome message when user is logged in", () => {
    render(
      <HomePage
        presenters={presenters}
        userLogin={userLoginEmployee}
        setCheckLogin={setCheckLogin}
      />
    );
    const welcomeMessageElement = screen.getByText(/Welcome Presenter 2/i);
    expect(welcomeMessageElement).toBeInTheDocument();
  });

  test("renders login form when user is not logged in", () => {
    render(
      <HomePage
        presenters={presenters}
        userLogin={userNotLogged}
        setCheckLogin={setCheckLogin}
      />
    );
    const loginFormElement = screen.getByTestId("login-form");
    expect(loginFormElement).toBeInTheDocument();
  });

  test("renders work shift message when user is an employee", () => {
    render(
      <HomePage
        presenters={presenters}
        userLogin={userLoginEmployee}
        setCheckLogin={setCheckLogin}
      />
    );
    const workShiftMessageElement = screen.getByText(/check your work shift/i);
    expect(workShiftMessageElement).toBeInTheDocument();
  });

  test("does not render work shift message when user is a boss", () => {
    render(
      <HomePage
        presenters={presenters}
        userLogin={userLoginBoss}
        setCheckLogin={setCheckLogin}
      />
    );
    const workShiftMessageElement = screen.queryByText(
      /check your work shift/i
    );
    expect(workShiftMessageElement).not.toBeInTheDocument();
  });

  test("renders welcome message when user is not logged in", () => {
    render(
      <HomePage
        presenters={presenters}
        userLogin={userNotLogged}
        setCheckLogin={setCheckLogin}
      />
    );
    const welcomeMessageElement = screen.getByText(
      /Welcome to React Schedule/i
    );
    expect(welcomeMessageElement).toBeInTheDocument();
  });
});
