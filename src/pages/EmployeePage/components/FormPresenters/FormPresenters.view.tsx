import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/Button/Button";
import { FormWrapper } from "./FormPresenters.styles";
import { PresenterType, Role } from "../../../../utils/types";
import { Formik, Form, ErrorMessage } from "formik";
import {
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import {
  addPresenter,
  editPresenter,
  getPresenters,
} from "../../../../utils/api";
import { timeDelay } from "../../../../utils/constants";

interface FormPresentersProps {
  modifyValues?: PresenterType;
  handleCloseFormPresentersModal: Function;
  setUpdatePresenters: Function;
}

const FormPresenters = ({
  modifyValues,
  handleCloseFormPresentersModal,
  setUpdatePresenters,
}: FormPresentersProps) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [newPresenterId, setNewPresenterId] = useState(0);

  useEffect(() => {
    const getPresentersData = async () => {
      const data = await getPresenters();
      if (data.length > 0) {
        setNewPresenterId(data[data.length - 1].id + 1);
      }
    };

    getPresentersData();
  }, []);

  const [checked, setChecked] = useState(
    modifyValues ? modifyValues?.available : true
  );

  const handleCheckbox = (event: any) => {
    setChecked(event.target.checked);
  };

  const submitUploadPresenter = async (values: any) => {
    setSubmitLoading(true);
    // Since we are using a mock api that takes very little time
    // We configure a setTimeout to be able to simulate the call
    // to the server and be able to see the configured loading
    setTimeout(() => {
      addPresenter({
        id: newPresenterId,
        name: values.name,
        role: Role.Employee,
        available: checked,
        address: values.address,
        phone: values.phone,
      });
      setSubmitLoading(false);
      handleCloseFormPresentersModal();
      setUpdatePresenters(true);
    }, timeDelay);
  };

  const submitModifyPresenter = async (values: any) => {
    setSubmitLoading(true);
    // Since we are using a mock api that takes very little time
    // We configure a setTimeout to be able to simulate the call
    // to the server and be able to see the configured loading
    setTimeout(() => {
      editPresenter({
        id: modifyValues?.id || newPresenterId,
        name: values.name,
        role: Role.Employee,
        available: checked,
        address: values.address,
        phone: values.phone,
      });
      setSubmitLoading(false);
      handleCloseFormPresentersModal();
      setUpdatePresenters(true);
    }, timeDelay);
  };

  const initialValues = modifyValues || {
    name: "",
    role: Role.Employee,
    available: true,
    address: "",
    phone: "",
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
          if (!values.phone) {
            errors = {
              ...errors,
              phone: "Phone required",
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
              <ErrorMessage
                name="name"
                component="div"
                // style={{ color: "red" }}
              />
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
              <ErrorMessage
                name="address"
                component="div"
                // style={{ color: "red" }}
              />
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
              <ErrorMessage
                name="phone"
                component="div"
                // style={{ color: "red" }}
              />
            </div>

            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleCheckbox} />}
              label="Available"
              sx={{ m: 1 }}
            />

            <div>
              <Button
                type="button"
                onClick={() => handleCloseFormPresentersModal()}
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

export default FormPresenters;
