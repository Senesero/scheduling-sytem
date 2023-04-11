import React from "react";
import { ScheduleWrapper } from "./Schedule.styles";
import {
  PresenterType,
  ScheduleType,
  Shift,
  TableType,
  UserLogin,
} from "../../../../utils/types";
import ScheduleTable from "./ScheduleTable/ScheduleTable.view";

interface ScheduleProps {
  schedule: ScheduleType;
  presenters: PresenterType[];
  tables: TableType[];
  userLogin: UserLogin;
}

const Schedule = ({
  schedule,
  presenters,
  tables,
  userLogin,
}: ScheduleProps) => {
  return (
    <ScheduleWrapper>
      <ScheduleTable
        key={Shift.Morning}
        shiftDuration={Number(schedule.shiftDuration)}
        data={schedule.shiftMorning}
        shift={Shift.Morning}
        presenters={presenters}
        tables={tables}
        availableTables={schedule.availableTables}
        userLogin={userLogin}
      />
      <ScheduleTable
        key={Shift.Afternoon}
        shiftDuration={Number(schedule.shiftDuration)}
        data={schedule.shiftAfternoon}
        shift={Shift.Afternoon}
        presenters={presenters}
        tables={tables}
        availableTables={schedule.availableTables}
        userLogin={userLogin}
      />
      <ScheduleTable
        key={Shift.Night}
        shiftDuration={Number(schedule.shiftDuration)}
        data={schedule.shifNight}
        shift={Shift.Night}
        presenters={presenters}
        tables={tables}
        availableTables={schedule.availableTables}
        userLogin={userLogin}
      />
    </ScheduleWrapper>
  );
};

export default Schedule;
