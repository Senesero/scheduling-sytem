import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm.view";
import { RoleType, Shift } from "../../../utils/types";
import userEvent from "@testing-library/user-event";

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

const setCheckLogin = jest.fn();

describe("LoginForm component", () => {
  it("renders the login form", () => {
    render(<LoginForm presenters={presenters} setCheckLogin={setCheckLogin} />);
    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();
  });

  it("displays validation errors when user and password fields are empty", async () => {
    render(<LoginForm presenters={presenters} setCheckLogin={setCheckLogin} />);

    const formValues = { user: "", password: "" };
    const form = screen.getByTestId("login-form");
    expect(form).toHaveFormValues(formValues);

    await waitFor(() => expect(setCheckLogin).not.toHaveBeenCalled());

    const submitButton = screen.getByRole("button", { name: "Login" });
    userEvent.click(submitButton);

    const userError = await screen.findByText("User required");
    const passwordError = await screen.findByText("Password required");

    expect(userError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
});
