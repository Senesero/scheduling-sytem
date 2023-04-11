import React, { useState } from "react";
import { Checkbox, CircularProgress } from "@mui/material";
import { Button } from "../../../../../components/Button/Button";
import FormPresentersModal from "../../FormPresenterModal/FormPresenterModal";
import { PresenterWrapper, Name, Text, CheckWrapper } from "./Presenter.styles";
import { PresenterType, RoleType, UserLogin } from "../../../../../utils/types";
import { deletePresenter } from "../../../../../utils/api";
import { timeDelay } from "../../../../../utils/constants";

interface PresenterProps {
  presenter: PresenterType;
  setUpdatePresenters: Function;
  userLogin: UserLogin;
}

const Presenter = ({
  presenter,
  setUpdatePresenters,
  userLogin,
}: PresenterProps) => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const deleteItem = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    setDeleteLoading(true);
    // Since we are using a mock api that takes very little time
    // We configure a setTimeout to be able to simulate the call
    // to the server and be able to see the configured loading
    setTimeout(() => {
      deletePresenter(index);
      setDeleteLoading(false);
      setUpdatePresenters(true);
    }, timeDelay);
  };

  return (
    <PresenterWrapper>
      <div>
        <Name>{presenter.name}</Name>
      </div>
      <div>
        <Text>{`Role: ${presenter.role}`}</Text>
      </div>
      <div>
        <Text>{`Address: ${presenter.address}`}</Text>
      </div>
      <div>
        <Text>{`Phone: ${presenter.phone}`}</Text>
      </div>
      {presenter.priority && (
        <div>
          <Text>{`Priority: ${presenter.priority}`}</Text>
        </div>
      )}
      {presenter.role === RoleType.Employee && (
        <>
          <CheckWrapper>
            <p>Available:</p>
            <Checkbox
              disabled
              checked={presenter.available}
              inputProps={{ "aria-label": "controlled" }}
            />
          </CheckWrapper>
          <CheckWrapper>
            <p>Ask Free Day:</p>
            <Checkbox
              disabled
              checked={presenter.askedFreeDay}
              inputProps={{ "aria-label": "controlled" }}
            />
          </CheckWrapper>
        </>
      )}
      <FormPresentersModal
        modifyValues={presenter}
        setUpdatePresenters={setUpdatePresenters}
      />
      {userLogin?.role === RoleType.Boss &&
        presenter.role === RoleType.Employee && (
          <div>
            <Button onClick={(e) => deleteItem(e, presenter.id)}>
              {deleteLoading ? <CircularProgress size={24} /> : "Delete"}
            </Button>
          </div>
        )}
    </PresenterWrapper>
  );
};

export default Presenter;
