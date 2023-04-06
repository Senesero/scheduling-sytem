import { BASE_URL } from "./constants";
import { PresenterType } from "./types";

export const getTables = async () => {
  const data = await fetch(`${BASE_URL}/tables`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return data;
};

export const getPresenters = async () => {
  const data = await fetch(`${BASE_URL}/employees`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return data;
};

export const addPresenter = (presenter: PresenterType) => {
  fetch("http://localhost:4000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(presenter),
  })
};

export const deletePresenter = async (id: number) => {
  fetch(`http://localhost:4000/employees/${id}`, {
    method: "DELETE",
  })
};

export const editPresenter = (updatedPresenter: PresenterType) => {
  fetch(`http://localhost:4000/employees/${updatedPresenter.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPresenter),
  })
};
