import styled from "styled-components";
import { TableCell, TableContainer, TableRow } from "@mui/material";

export const ScheduleTablePropsWrapper = styled.div`
  max-width: 1500px;
  text-align: center;
  overflow: "auto";
`;

export const StyledTableContainer = styled(TableContainer)`
  background-color: #f5f5f5;
  margin-bottom: 20px;
`;

export const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: #d3e8ff;
  }
`;

export const StyledTableCell = styled(TableCell)`
  font-weight: bold;
  color: #fff;
`;
