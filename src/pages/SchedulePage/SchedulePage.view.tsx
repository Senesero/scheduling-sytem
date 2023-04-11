import React, { useEffect, useState } from "react";
import {
  SchedulePageWrapper,
  ParamsWrapper,
  ColumnsWrapper,
  RowWrapper,
  StyledSelect,
  Name,
  ErrorWrapper,
} from "./SchedulePage.styles";
import {
  PresenterType,
  Shift,
  RoleType,
  OptionsBoolean,
  ShiftTime,
  ScheduleType,
} from "../../utils/types";
import { Form, Formik } from "formik";
import { Button } from "../../components/Button/Button";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { TableType } from "../../utils/types";
import { getSchedule, setScheduleData } from "../../utils/api";
import Schedule from "./components/Schedule.view";

interface SchedulePageProps {
  presenters: PresenterType[];
  tables: TableType[];
}

type ScheduleParamsType = {
  presentersFoundToWork: string[];
  tablesFoundToPlay: string[];
  presentersFoundToWorkMorning: string[];
  presentersFoundToWorkAfternoon: string[];
  presentersFoundToWorkNight: string[];
  presentersWithoutPriority: string[];
  needWorkersMorning: number;
  needWorkersAfternoon: number;
  needWorkersNight: number;
};

interface InitialValuesInteface {
  shiftDuration: ShiftTime;
  [key: string]: ShiftTime | Shift | OptionsBoolean | boolean;
}

const SchedulePage = ({ presenters, tables }: SchedulePageProps) => {
  const [calculateError, setCalculateError] = useState<string>("");
  const [initialValues, setInitialValues] = useState<InitialValuesInteface>({
    shiftDuration: ShiftTime.Sixty,
  });
  const [initialValuesCalculated, setInitialValuesCalculated] =
    useState<boolean>(false);

  const [schedule, setSchedule] = useState<ScheduleType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getScheduleData = async () => {
      const data = await getSchedule();
      setSchedule(data);
      setLoading(false);
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
      setInitialValuesCalculated(true);
    };

    if (presenters.length > 0 && tables.length > 0) getInitialValues();
  }, [presenters, tables]);

  const calculateSchedule = (
    values: InitialValuesInteface,
    scheduleParams: ScheduleParamsType
  ) => {
    const newDailySchedule: ScheduleType = {
      shiftDuration: values.shiftDuration,
      shiftMorning: [],
      shiftAfternoon: [],
      shifNight: [],
      availableTables: scheduleParams.tablesFoundToPlay,
    };

    let turn = 0;
    for (let i = 0; i < scheduleParams.needWorkersMorning; i++) {
      if (scheduleParams.presentersFoundToWorkMorning[i]) {
        newDailySchedule.shiftMorning.push({
          id: newDailySchedule.shiftMorning.length + 1,
          presenter: Number(scheduleParams.presentersFoundToWorkMorning[i]),
          turn,
        });
      } else {
        newDailySchedule.shiftMorning.push({
          id: newDailySchedule.shiftMorning.length + 1,
          presenter: Number(scheduleParams.presentersWithoutPriority[0]),
          turn,
        });
        scheduleParams.presentersWithoutPriority.shift();
      }
      turn++;
    }

    turn = 0;
    for (let i = 0; i < scheduleParams.needWorkersAfternoon; i++) {
      if (scheduleParams.presentersFoundToWorkAfternoon[i]) {
        newDailySchedule.shiftAfternoon.push({
          id: newDailySchedule.shiftAfternoon.length + 1,
          presenter: Number(scheduleParams.presentersFoundToWorkAfternoon[i]),
          turn,
        });
      } else {
        newDailySchedule.shiftAfternoon.push({
          id: newDailySchedule.shiftAfternoon.length + 1,
          presenter: Number(scheduleParams.presentersWithoutPriority[0]),
          turn,
        });
        scheduleParams.presentersWithoutPriority.shift();
      }
      turn++;
    }

    turn = 0;
    for (let i = 0; i < scheduleParams.needWorkersNight; i++) {
      if (scheduleParams.presentersFoundToWorkNight[i]) {
        newDailySchedule.shifNight.push({
          id: newDailySchedule.shifNight.length + 1,
          presenter: Number(scheduleParams.presentersFoundToWorkNight[i]),
          turn,
        });
      } else {
        newDailySchedule.shifNight.push({
          id: newDailySchedule.shifNight.length + 1,
          presenter: Number(scheduleParams.presentersWithoutPriority[0]),
          turn,
        });
        scheduleParams.presentersWithoutPriority.shift();
      }
      turn++;
    }

    setSchedule(newDailySchedule);
    setScheduleData(newDailySchedule);
  };

  const checkPresentersAndGames = (values: InitialValuesInteface) => {
    let error = "";
    let scheduleParams: ScheduleParamsType = {
      presentersFoundToWork: [],
      tablesFoundToPlay: [],
      presentersFoundToWorkMorning: [],
      presentersFoundToWorkAfternoon: [],
      presentersFoundToWorkNight: [],
      presentersWithoutPriority: [],
      needWorkersMorning: 0,
      needWorkersAfternoon: 0,
      needWorkersNight: 0,
    };

    Object.keys(values).map((value) => {
      const index = value.split("-")[1];
      if (value.includes("askedFreeDay") && values[value] === "false") {
        scheduleParams?.presentersFoundToWork?.push(index);
      } else if (value.includes("working") && values[value] === "true") {
        scheduleParams?.tablesFoundToPlay?.push(index);
      } else if (value.includes("priority")) {
        if (values[`askedFreeDay-${index}`] === "false") {
          if (values[value] === Shift.Morning) {
            scheduleParams?.presentersFoundToWorkMorning?.push(index);
          } else if (values[value] === Shift.Afternoon) {
            scheduleParams?.presentersFoundToWorkAfternoon?.push(index);
          } else if (values[value] === Shift.Night) {
            scheduleParams?.presentersFoundToWorkNight?.push(index);
          } else {
            scheduleParams?.presentersWithoutPriority?.push(index);
          }
        }
      }
    });

    const presentersPerTurn = scheduleParams.presentersFoundToWork.length / 3;
    const needWorkersMorning = Math.trunc(presentersPerTurn);
    const needWorkersAfternoon = Math.trunc(presentersPerTurn);
    const needWorkersNight =
      scheduleParams.presentersFoundToWork.length -
      needWorkersMorning -
      needWorkersAfternoon;

    scheduleParams = {
      ...scheduleParams,
      needWorkersMorning,
      needWorkersAfternoon,
      needWorkersNight,
    };

    const ratioPresetersTables =
      (scheduleParams.tablesFoundToPlay.length + 1) * 3;
    // Add one to be able to calculate the rest
    if (scheduleParams.presentersFoundToWork.length === 0) {
      error = "At least one employee has to work";
    } else if (scheduleParams.tablesFoundToPlay.length === 0) {
      error = "At least there has to be a table to play";
    } else if (
      ratioPresetersTables > scheduleParams.presentersFoundToWork.length
    ) {
      error = `There are ${
        scheduleParams.presentersFoundToWork.length
      } presenters and ${
        scheduleParams.tablesFoundToPlay.length
      } tables. There should be  ${
        ratioPresetersTables - scheduleParams.presentersFoundToWork.length
      } more presenters to cover all the tables in all shifts`;
    } else if (
      scheduleParams.presentersFoundToWorkMorning.length > needWorkersMorning
    ) {
      error = "There are too many presenters in the morning";
    } else if (
      scheduleParams.presentersFoundToWorkAfternoon.length >
      needWorkersAfternoon
    ) {
      error = "There are too many presenters in the afternoon";
    } else if (
      scheduleParams.presentersFoundToWorkNight.length > needWorkersNight
    ) {
      error = "There are too many presenters at night";
    }

    if (error) {
      setCalculateError(error);
    } else {
      calculateSchedule(values, scheduleParams);
    }
  };

  const getEmployeeRowColor = (
    values: InitialValuesInteface,
    presenter: PresenterType
  ) => {
    if (values[`askedFreeDay-${presenter.id}`] === "true") {
      return "#dc5555";
    } else {
      return "#00ff99";
    }
  };

  const getTableRowColor = (
    values: InitialValuesInteface,
    presenter: TableType
  ) => {
    if (values[`working-${presenter.id}`] === "false") {
      return "#dc5555";
    } else {
      return "#00ff99";
    }
  };

  return (
    <>
      <SchedulePageWrapper>
        <h1>SchedulePage</h1>
        {!initialValuesCalculated ? (
          <div>
            <h3>Loading data...</h3>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              setCalculateError("");
              setLoading(true);
              setTimeout(() => {
                checkPresentersAndGames(values);
                setLoading(false);
              }, 1000);
            }}
          >
            {({ values, handleChange, handleSubmit }) => {
              const priorityOptions = Object.values(Shift);
              const booleanOptions = Object.values(OptionsBoolean);
              const shiftTimeOptions = Object.values(ShiftTime);
              return (
                <Form onSubmit={handleSubmit}>
                  <ParamsWrapper>
                    <ColumnsWrapper>
                      <h3>Employees</h3>
                      {presenters.map(
                        (presenter, key) =>
                          presenter.role === RoleType.Employee &&
                          presenter.available && (
                            <RowWrapper
                              key={key}
                              color={getEmployeeRowColor(values, presenter)}
                            >
                              <Name>{presenter.name}</Name>
                              <FormControl sx={{ m: 2 }}>
                                <InputLabel id="collection-select">
                                  Priority
                                </InputLabel>
                                <StyledSelect
                                  labelId="collection-select"
                                  id={`priority-${presenter.id}`}
                                  value={values[`priority-${presenter.id}`]}
                                  label="Priority"
                                  onChange={handleChange}
                                  name={`priority-${presenter.id}`}
                                >
                                  {priorityOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))}
                                </StyledSelect>
                              </FormControl>
                              <FormControl sx={{ m: 2 }}>
                                <InputLabel id="collection-select">
                                  Asked Free Day
                                </InputLabel>
                                <StyledSelect
                                  labelId="collection-select"
                                  id={`askedFreeDay-${presenter.id}`}
                                  value={values[`askedFreeDay-${presenter.id}`]}
                                  label="Asked Free Day"
                                  onChange={handleChange}
                                  name={`askedFreeDay-${presenter.id}`}
                                >
                                  {booleanOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))}
                                </StyledSelect>
                              </FormControl>
                            </RowWrapper>
                          )
                      )}
                    </ColumnsWrapper>

                    <ColumnsWrapper>
                      <div>
                        <h3>Tables</h3>
                        {tables.map(
                          (table, key) =>
                            table.available && (
                              <RowWrapper
                                key={key}
                                color={getTableRowColor(values, table)}
                              >
                                <Name>{table.game}</Name>
                                <FormControl sx={{ m: 2 }}>
                                  <InputLabel id="collection-select">
                                    Working
                                  </InputLabel>
                                  <StyledSelect
                                    labelId="collection-select"
                                    id={`working-${table.id}`}
                                    value={values[`working-${table.id}`]}
                                    label="Working"
                                    onChange={handleChange}
                                    name={`working-${table.id}`}
                                  >
                                    {booleanOptions.map((option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </StyledSelect>
                                </FormControl>
                              </RowWrapper>
                            )
                        )}
                      </div>

                      <h3>Other params</h3>
                      <RowWrapper>
                        <Name>Shift duration</Name>
                        <FormControl sx={{ m: 2 }}>
                          <InputLabel id="collection-select">
                            Shift Duration
                          </InputLabel>
                          <StyledSelect
                            labelId="collection-select"
                            id="shiftDuration"
                            value={values.shiftDuration}
                            label="shift Duration"
                            onChange={handleChange}
                            name="shiftDuration"
                          >
                            {shiftTimeOptions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </StyledSelect>
                        </FormControl>
                      </RowWrapper>
                    </ColumnsWrapper>
                  </ParamsWrapper>

                  <div>
                    <ErrorWrapper>{calculateError}</ErrorWrapper>
                    <Button primary type="submit" disabled={loading}>
                      {loading ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Calculate turns"
                      )}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
      </SchedulePageWrapper>
      {schedule && Object.keys(schedule).length > 0 && (
        <Schedule schedule={schedule} presenters={presenters} tables={tables} />
      )}
    </>
  );
};

export default SchedulePage;
