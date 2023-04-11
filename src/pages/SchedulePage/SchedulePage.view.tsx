import React, { useEffect, useState } from "react";
import { LoadingWrapper } from "./SchedulePage.styles";
import {
  PresenterType,
  Shift,
  RoleType,
  OptionsBoolean,
  ShiftTime,
  ScheduleType,
  UserLogin,
} from "../../utils/types";
import { TableType } from "../../utils/types";
import { getSchedule } from "../../utils/api";
import Schedule from "./components/Schedule/Schedule.view";
import ScheduleForm from "./components/ScheduleForm/ScheduleForm.view";

interface SchedulePageProps {
  presenters: PresenterType[];
  tables: TableType[];
  userLogin: UserLogin;
}

interface InitialValuesInteface {
  shiftDuration: ShiftTime;
  [key: string]: ShiftTime | Shift | OptionsBoolean | boolean;
}

const SchedulePage = ({ presenters, tables, userLogin }: SchedulePageProps) => {
  const [initialValues, setInitialValues] = useState<InitialValuesInteface>({
    shiftDuration: ShiftTime.Sixty,
  });
  const [schedule, setSchedule] = useState<ScheduleType>();
  const [loadingSchedule, setLoadingSchedule] = useState<boolean>(true);

  useEffect(() => {
    const getScheduleData = async () => {
      const data = await getSchedule();
      setSchedule(data);
      setLoadingSchedule(false);
    };

    getScheduleData();
  }, []);

  useEffect(() => {
    const getInitialValues = async () => {
      let newInitialValuesPresenters = {};
      await presenters.forEach((presenter) => {
        const { id, role, priority, available, askedFreeDay } = presenter;
        if (role === RoleType.Employee && available) {
          newInitialValuesPresenters = {
            ...newInitialValuesPresenters,
            [`priority-${id}`]: priority,
            [`askedFreeDay-${id}`]: askedFreeDay ? "true" : "false",
          };
        }
      });

      let newInitialValuesTables = {};
      await tables.forEach((table) => {
        const { id, available, working } = table;
        if (available) {
          newInitialValuesTables = {
            ...newInitialValuesTables,
            [`working-${id}`]: working ? "true" : "false",
          };
        }
      });

      setInitialValues({
        ...initialValues,
        ...newInitialValuesPresenters,
        ...newInitialValuesTables,
      });
    };

    if (presenters.length > 0 && tables.length > 0) getInitialValues();
  }, [presenters, tables]);

  return (
    <>
      {userLogin?.role === RoleType.Boss && (
        <ScheduleForm
          presenters={presenters}
          tables={tables}
          setSchedule={setSchedule}
        />
      )}
      {loadingSchedule ? (
        <LoadingWrapper>
          <h3>Loading data...</h3>
        </LoadingWrapper>
      ) : (
        schedule &&
        Object.keys(schedule).length > 0 && (
          <Schedule
            schedule={schedule}
            presenters={presenters}
            tables={tables}
            userLogin={userLogin}
          />
        )
      )}
    </>
  );
};

export default SchedulePage;
