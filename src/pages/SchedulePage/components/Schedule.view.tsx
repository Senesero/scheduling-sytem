import React from "react";
import { ScheduleWrapper } from "./Schedule.styles";
import {
  PresenterType,
  ScheduleType,
  Shift,
  TableType,
} from "../../../utils/types";
import ScheduleTable from "./components/ScheduleTable/ScheduleTable.view";

interface ScheduleProps {
  schedule: ScheduleType;
  presenters: PresenterType[];
  tables: TableType[];
}

const Schedule = ({ schedule, presenters, tables }: ScheduleProps) => {
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
      />
      <ScheduleTable
        key={Shift.Afternoon}
        shiftDuration={Number(schedule.shiftDuration)}
        data={schedule.shiftAfternoon}
        shift={Shift.Afternoon}
        presenters={presenters}
        tables={tables}
        availableTables={schedule.availableTables}
      />
      <ScheduleTable
        key={Shift.Night}
        shiftDuration={Number(schedule.shiftDuration)}
        data={schedule.shifNight}
        shift={Shift.Night}
        presenters={presenters}
        tables={tables}
        availableTables={schedule.availableTables}
      />
    </ScheduleWrapper>
  );
};

export default Schedule;
