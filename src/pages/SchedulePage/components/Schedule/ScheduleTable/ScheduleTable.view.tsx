import React from "react";
import {
  ScheduleTablePropsWrapper,
  StyledTableCell,
  StyledTableContainer,
} from "./ScheduleTable.styles";
import {
  Period,
  PresenterType,
  Shift,
  TableType,
  UserLogin,
} from "../../../../../utils/types";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";

interface ScheduleTableProps {
  shiftDuration: number;
  data: Period[];
  shift: Shift;
  presenters: PresenterType[];
  tables: TableType[];
  availableTables: string[];
  userLogin: UserLogin;
}

const ScheduleTable = ({
  shiftDuration,
  data,
  shift,
  presenters,
  tables,
  availableTables,
  userLogin,
}: ScheduleTableProps) => {
  const periods = (8 * 60) / shiftDuration;

  let startShift = new Date();
  if (shift === Shift.Morning) {
    startShift.setHours(6);
    startShift.setMinutes(0);
  } else if (shift === Shift.Afternoon) {
    startShift.setHours(14);
    startShift.setMinutes(0);
  } else if (shift === Shift.Night) {
    startShift.setHours(22);
    startShift.setMinutes(0);
  }

  const headerColumns = [];
  for (let i = 0; i < periods; i++) {
    const initTime = `${startShift.getHours()}:${startShift
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    startShift.setMinutes(startShift.getMinutes() + shiftDuration);
    const finishTime = `${startShift.getHours()}:${startShift
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    headerColumns.push(
      <>
        <StyledTableCell>{`${initTime} - ${finishTime}`}</StyledTableCell>
      </>
    );
  }

  const getTableNames = () => {
    const tablesTurn: string[] = [];
    const turns = data[data.length - 1].turn;
    for (let i = 0; i <= turns; i++) {
      if (i < availableTables.length) {
        const findTable = tables.find(
          (table) => table.id === Number(availableTables[i])
        );
        const nameGame = findTable?.game || "";
        tablesTurn.push(nameGame);
      } else {
        tablesTurn.push("Break");
      }
    }
    return tablesTurn;
  };

  const getBodyColumns = (turn: number) => {
    const tableNames = getTableNames();
    const bodyColumns = [];
    for (let i = 0; i < periods; i++) {
      const tableName = tableNames[turn % tableNames.length];
      bodyColumns.push(
        <>
          <StyledTableCell>{`${tableName}`}</StyledTableCell>
        </>
      );
      turn++;
    }
    return bodyColumns;
  };

  const getPresenterName = (id: number) => {
    const presenter = presenters.find((presenter) => presenter.id === id);
    return presenter?.name || "";
  };

  const getColorRow = (index: number, idPresenter: number) => {
    if (userLogin?.id === idPresenter) {
      return "#00ff99";
    } else {
      return index % 2 === 0 ? "#BEEFFF" : "#EAF7FF";
    }
  };

  return (
    <ScheduleTablePropsWrapper>
      <h3>{`${shift} turn`}</h3>
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              {headerColumns}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                style={{
                  backgroundColor: getColorRow(index, item.presenter),
                }}
              >
                <StyledTableCell>
                  {getPresenterName(item.presenter)}
                </StyledTableCell>
                {getBodyColumns(item.turn)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </ScheduleTablePropsWrapper>
  );
};

export default ScheduleTable;
