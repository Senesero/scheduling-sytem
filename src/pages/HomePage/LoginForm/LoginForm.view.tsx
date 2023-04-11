import React, { useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { FormWrapper, ErrorWrapper } from "./LoginForm.styles";
import { Button } from "../../../components/Button/Button";
import { CircularProgress, FormControl, TextField } from "@mui/material";
import { PresenterType, UserType } from "../../../utils/types";
import { login } from "../../../utils/api";

interface LoginFormProps {
  presenters: PresenterType[];
  setCheckLogin: Function;
}

const LoginForm = ({ presenters, setCheckLogin }: LoginFormProps) => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<string>("");

  const initialValues: UserType = {
    user: "",
    password: "",
  };

  return (
    <FormWrapper>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          let errors = {};
          if (!values.user) {
            errors = {
              ...errors,
              user: "User required",
            };
          }

          if (!values.password) {
            errors = {
              ...errors,
              password: "Password required",
            };
          }
          return errors;
        }}
        onSubmit={(values) => {
          setSubmitLoading(true);
          setErrorLogin("");
          setTimeout(async () => {
            await login(values, presenters)
              .then((loggedIn) => {
                if (!loggedIn) {
                  setErrorLogin("Name or password invalids");
                } else {
                  setCheckLogin(true);
                }
              })
              .finally(() => setSubmitLoading(false));
          }, 1000);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit} data-testid="login-form">
              <div>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="user"
                    label="User"
                    name="user"
                    variant="outlined"
                    value={values.user}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
                <ErrorWrapper role="userError">
                  <ErrorMessage name="user" component="div" />
                </ErrorWrapper>
              </div>

              <div>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
                <ErrorWrapper role="passwordError">
                  <ErrorMessage name="password" component="div" />
                </ErrorWrapper>
              </div>

              {errorLogin && <ErrorWrapper>{errorLogin}</ErrorWrapper>}
              <div>
                <Button primary type="submit" disabled={submitLoading}>
                  {submitLoading ? <CircularProgress size={24} /> : "Login"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </FormWrapper>
  );
};

export default LoginForm;
