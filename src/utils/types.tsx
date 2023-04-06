export enum Shift {
  Morning = "Morning",
  Afternoon = "Afternoon",
  Night = "Night",
}

export enum Role {
  Boss = "Boss",
  Employee = "Employee",
}

export type PresenterType = {
  id: number;
  name: string;
  role: Role;
  available?: boolean;
  address?: string;
  phone?: number;
};

export type TableType = {
  id: number;
  game: string;
  room: number;
  numberOfPlayers: number;
};

export type ScheduleType = {
  id: number;
  presenter: string;
  shift: Shift;
  turn: number;
};
