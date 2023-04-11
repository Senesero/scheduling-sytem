import { Select } from "@mui/material";
import styled from "styled-components";

export const ScheduleFormWrapper = styled.div`
  text-align: center;
`;

export const ParamsWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const ColumnsWrapper = styled.div`
  width: 500px;
  padding: 20px;
  margin: 20px;
`;

export const RowWrapper = styled.div<{ color?: string }>`
  background: ${(props) => props.color || "white"};
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px dashed black;
`;

export const Name = styled.p`
  width: 150px;
  margin: 0px;
  font-size: 15px;
  font-weight: bold;
`;

export const StyledSelect = styled(Select)`
  width: 150px;
`;

export const ErrorWrapper = styled.div`
  background-color: black;
  color: white;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
