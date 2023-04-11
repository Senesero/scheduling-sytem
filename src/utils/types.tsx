export enum Shift {
  Any = "Any",
  Morning = "Morning",
  Afternoon = "Afternoon",
  Night = "Night",
}

export enum RoleType {
  Boss = "Boss",
  Employee = "Employee",
}

export type PresenterType = {
  id: number;
  name: string;
  role: RoleType;
  available?: boolean;
  address?: string;
  phone?: "";
  priority: Shift;
  askedFreeDay?: boolean;
};

export type TableType = {
  id: number;
  game: string;
  room: number;
  numberOfPlayers: number;
  available?: boolean;
  working?: boolean;
};

export type Period = {
  id: number;
  presenter: number;
  turn: number;
};

export type ScheduleType = {
  shiftDuration: ShiftTime;
  shiftMorning: Period[];
  shiftAfternoon: Period[];
  shifNight: Period[];
  availableTables: string[];
};

export enum OptionsBoolean {
  True = "true",
  False = "false",
}

export enum ShiftTime {
  Twenty = "20",
  Thirty = "30",
  Sixty = "60",
  OneHundredTwenty = "120",
}
