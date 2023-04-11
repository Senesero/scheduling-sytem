import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/Button/Button";
import { FormWrapper, ErrorWrapper } from "./FormTables.styles";
import { TableType } from "../../../../utils/types";
import { Formik, Form, ErrorMessage } from "formik";
import {
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  CircularProgress,
  CheckboxProps,
} from "@mui/material";
import { addTable, editTable, getTables } from "../../../../utils/api";
import { timeDelay } from "../../../../utils/constants";

interface FormTablesProps {
  modifyValues?: TableType;
  handleCloseFormTablesModal: Function;
  setUpdateTables: Function;
}

const FormTables = ({
  modifyValues,
  handleCloseFormTablesModal,
  setUpdateTables,
}: FormTablesProps) => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [newTableId, setNewTableId] = useState<number>(0);

  useEffect(() => {
    const getTablesData = async () => {
      const data = await getTables();
      if (data.length > 0) {
        setNewTableId(data[data.length - 1].id + 1);
      }
    };

    getTablesData();
  }, []);

  const [checkedAvailable, setCheckedAvailable] = useState<boolean>(
    modifyValues?.available || true
  );

  const handlecheckedAvailableCheckbox: CheckboxProps["onChange"] = (event) => {
    setCheckedAvailable(event.target.checked);
  };

  const [checkedWorking, setCheckedWorking] = useState<boolean>(
    modifyValues?.working || true
  );

  const handlecheckedWorkingCheckbox: CheckboxProps["onChange"] = (event) => {
    setCheckedWorking(event.target.checked);
  };

  const submitUploadTable = async (values: TableType) => {
    setSubmitLoading(true);
    // Since we are using a mock api that takes very little time
    // We configure a setTimeout to be able to simulate the call
    // to the server and be able to see the configured loading
    setTimeout(() => {
      addTable({
        id: newTableId,
        game: values.game,
        room: values.room,
        available: checkedAvailable,
        numberOfPlayers: values.numberOfPlayers,
        working: checkedWorking,
      });
      setSubmitLoading(false);
      handleCloseFormTablesModal();
      setUpdateTables(true);
    }, timeDelay);
  };

  const submitModifyTable = async (values: TableType) => {
    setSubmitLoading(true);
    // Since we are using a mock api that takes very little time
    // We configure a setTimeout to be able to simulate the call
    // to the server and be able to see the configured loading
    setTimeout(() => {
      editTable({
        id: modifyValues?.id || newTableId,
        game: values.game,
        room: values.room,
        available: checkedAvailable,
        numberOfPlayers: values.numberOfPlayers,
        working: checkedWorking,
      });
      setSubmitLoading(false);
      handleCloseFormTablesModal();
      setUpdateTables(true);
    }, timeDelay);
  };

  const initialValues: TableType = modifyValues || {
    id: 0,
    game: "",
    room: 0,
    available: true,
    numberOfPlayers: 0,
    working: true,
  };

  return (
    <FormWrapper>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          let errors = {};
          const regex = /^([1-9]|[1-9][0-9])$/;
          if (!values.game) {
            errors = {
              ...errors,
              game: "Game required",
            };
          }
          if (!values.room) {
            errors = {
              ...errors,
              room: "Room required",
            };
          } else if (!regex.test(String(values.room))) {
            errors = {
              ...errors,
              room: "The room only admit numbers",
            };
          }

          if (!values.numberOfPlayers) {
            errors = {
              ...errors,
              numberOfPlayers: "number of players required",
            };
          } else if (!regex.test(String(values.numberOfPlayers))) {
            errors = {
              ...errors,
              numberOfPlayers: "The number of players only admit numbers",
            };
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          if (modifyValues?.game) {
            await submitModifyTable(values);
          } else {
            await submitUploadTable(values);
          }
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  id="game"
                  label="Game"
                  name="game"
                  variant="outlined"
                  value={values.game}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              <ErrorWrapper>
                <ErrorMessage name="game" component="div" />
              </ErrorWrapper>
            </div>

            <div>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  id="room"
                  label="Room"
                  name="room"
                  variant="outlined"
                  value={values.room}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                />
              </FormControl>
              <ErrorWrapper>
                <ErrorMessage name="room" component="div" />
              </ErrorWrapper>
            </div>

            <div>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  id="numberOfPlayers"
                  label="number Of Players"
                  name="numberOfPlayers"
                  variant="outlined"
                  value={values.numberOfPlayers}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                />
              </FormControl>
              <ErrorWrapper>
                <ErrorMessage name="numberOfPlayers" component="div" />
              </ErrorWrapper>
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedAvailable}
                  onChange={handlecheckedAvailableCheckbox}
                />
              }
              label="Available"
              sx={{ m: 1 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedWorking}
                  onChange={handlecheckedWorkingCheckbox}
                />
              }
              label="Working"
              sx={{ m: 1 }}
            />

            <div>
              <Button
                type="button"
                onClick={() => handleCloseFormTablesModal()}
              >
                Cancel
              </Button>
              {modifyValues?.game ? (
                <Button primary type="submit" disabled={isSubmitting}>
                  {submitLoading ? <CircularProgress size={24} /> : "Modify"}
                </Button>
              ) : (
                <Button primary type="submit" disabled={isSubmitting}>
                  {submitLoading ? <CircularProgress size={24} /> : "Create"}
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default FormTables;
