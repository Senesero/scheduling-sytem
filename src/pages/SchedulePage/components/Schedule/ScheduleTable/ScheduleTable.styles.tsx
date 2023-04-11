import styled from "styled-components";
import { TableCell, TableContainer } from "@mui/material";

export const ScheduleTablePropsWrapper = styled.div`
  max-width: 1500px;
  text-align: center;
  overflow: "auto";
`;

export const StyledTableContainer = styled(TableContainer)`
  margin-bottom: 20px;
`;

export const StyledTableCell = styled(TableCell)`
  font-weight: bold;
  color: #fff;
`;
