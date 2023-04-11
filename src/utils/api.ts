import { BASE_URL } from "./constants";
import { PresenterType, ScheduleType, TableType } from "./types";

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

export const getTables = async () => {
  const data = await fetch(`${BASE_URL}/tables`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return data;
};

export const addTable = (table: TableType) => {
  fetch("http://localhost:4000/tables", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(table),
  })
};

export const deleteTable = async (id: number) => {
  fetch(`http://localhost:4000/tables/${id}`, {
    method: "DELETE",
  })
};

export const editTable = (updatedTable: TableType) => {
  fetch(`http://localhost:4000/tables/${updatedTable.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTable),
  })
};

export const getSchedule = async () => {
  const data = await fetch(`${BASE_URL}/dailySchedule`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return data;
};

export const setScheduleData = (scheduleData: ScheduleType) => {
  fetch(`http://localhost:4000/dailySchedule`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scheduleData),
  })
};