import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/Button/Button";
import { FormWrapper, ErrorWrapper } from "./FormPresenter.styles";
import { PresenterType, RoleType, Shift } from "../../../../utils/types";
import { Formik, Form, ErrorMessage } from "formik";
import {
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
  CheckboxProps,
} from "@mui/material";
import {
  addPresenter,
  editPresenter,
  getPresenters,
} from "../../../../utils/api";
import { timeDelay } from "../../../../utils/constants";

interface FormPresenterProps {
  modifyValues?: PresenterType;
  handleCloseFormPresenterModal: Function;
  setUpdatePresenters: Function;
}

const FormPresenter = ({
  modifyValues,
  handleCloseFormPresenterModal,
  setUpdatePresenters,
}: FormPresenterProps) => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [newPresenterId, setNewPresenterId] = useState<number>(0);
  const options = Object.values(Shift);

  useEffect(() => {
    const getPresentersData = async () => {
      const data = await getPresenters();
      if (data.length > 0) {
        setNewPresenterId(data[data.length - 1].id + 1);
      }
    };

    getPresentersData();
  }, []);

  const [checkedAvailable, setCheckedAvailable] = useState<boolean>(
    modifyValues?.available || true
  );

  const handleCheckboxAvailable: CheckboxProps["onChange"] = (event) => {
    setCheckedAvailable(event.target.checked);
  };

  const [checkedAskFreeDay, setCheckedAskFreeDay] = useState<boolean>(
    modifyValues?.askedFreeDay || false
  );

  const handleCheckboxAskFreeDay: CheckboxProps["onChange"] = (event) => {
    setCheckedAskFreeDay(event.target.checked);
  };

  const submitUploadPresenter = async (values: PresenterType) => {
    setSubmitLoading(true);
    // Since we are using a mock api that takes very little time
    // We configure a setTimeout to be able to simulate the call
    // to the server and be able to see the configured loading
    setTimeout(() => {
      addPresenter({
        id: newPresenterId,
        name: values.name,
        role: RoleType.Employee,
        available: checkedAvailable,
        address: values.address,
        phone: values.phone,
        priority: values.priority,
        askedFreeDay: checkedAskFreeDay,
      });
      setSubmitLoading(false);
      handleCloseFormPresenterModal();
      setUpdatePresenters(true);
    }, timeDelay);
  };

  const submitModifyPresenter = async (values: PresenterType) => {
    setSubmitLoading(true);
    // Since we are using a mock api that takes very little time
    // We configure a setTimeout to be able to simulate the call
    // to the server and be able to see the configured loading
    setTimeout(() => {
      editPresenter({
        id: modifyValues?.id || newPresenterId,
        name: values.name,
        role: RoleType.Employee,
        available: checkedAvailable,
        address: values.address,
        phone: values.phone,
        priority: values.priority,
        askedFreeDay: checkedAskFreeDay,
      });
      setSubmitLoading(false);
      handleCloseFormPresenterModal();
      setUpdatePresenters(true);
    }, timeDelay);
  };

  const initialValues: PresenterType = modifyValues || {
    id: 0,
    name: "",
    role: RoleType.Employee,
    available: true,
    address: "",
    phone: "",
    priority: Shift.Any,
    askedFreeDay: false,
  };

  return (
    <FormWrapper>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          let errors = {};
          if (!values.name) {
            errors = {
              ...errors,
              name: "Name required",
            };
          }
          if (!values.address) {
            errors = {
              ...errors,
              address: "Address required",
            };
          }
          const regex = /^\d{9}$/;
          if (!values.phone) {
            errors = {
              ...errors,
              phone: "Phone required",
            };
          } else if (!regex.test(String(values.phone))) {
            errors = {
              ...errors,
              phone: "The phone must be numeric and of length 9",
            };
          }
          if (!values.priority) {
            errors = {
              ...errors,
              priority: "Priority required",
            };
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          if (modifyValues?.name) {
            await submitModifyPresenter(values);
          } else {
            await submitUploadPresenter(values);
          }
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  id="name"
                  label="Name"
                  name="name"
                  variant="outlined"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              <ErrorWrapper>
                <ErrorMessage name="name" component="div" />
              </ErrorWrapper>
            </div>
            <div>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  id="address"
                  label="Address"
                  name="address"
                  variant="outlined"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              <ErrorWrapper>
                <ErrorMessage name="address" component="div" />
              </ErrorWrapper>
            </div>
            <div>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  id="phone"
                  label="Phone"
                  name="phone"
                  variant="outlined"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              <ErrorWrapper>
                <ErrorMessage name="phone" component="div" />
              </ErrorWrapper>
            </div>
            <div>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="collection-select">Priority</InputLabel>
                <Select
                  labelId="collection-select"
                  id="priority"
                  value={values.priority}
                  label="Priority"
                  onChange={handleChange}
                  name="priority"
                >
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ErrorWrapper>
                <ErrorMessage name="priority" component="div" />
              </ErrorWrapper>
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedAvailable}
                  onChange={handleCheckboxAvailable}
                />
              }
              label="Available"
              sx={{ m: 1 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedAskFreeDay}
                  onChange={handleCheckboxAskFreeDay}
                />
              }
              label="Ask Free Day"
              sx={{ m: 1 }}
            />
            <div>
              <Button
                type="button"
                onClick={() => handleCloseFormPresenterModal()}
              >
                Cancel
              </Button>
              {modifyValues?.name ? (
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

export default FormPresenter;
