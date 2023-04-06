import React, { useState } from "react";
import { Checkbox, CircularProgress } from "@mui/material";
import { Button } from "../../../../../components/Button/Button";
import FormPresentersModal from "../../FormPresentersModal/FormPresentersModal";
import {
  PresenterWrapper,
  NameWrapper,
  Name,
  RoleWrapper,
  Role,
  AddressWrapper,
  Address,
  AvailableWrapper,
} from "./Presenter.styles";
import { PresenterType } from "../../../../../utils/types";
import { deletePresenter } from "../../../../../utils/api";
import { timeDelay } from "../../../../../utils/constants";

interface PresenterProps {
  isEditing?: boolean;
  presenter: PresenterType;
  setUpdatePresenters: Function;
}

const Presenter = ({
  presenter,
  isEditing,
  setUpdatePresenters,
}: PresenterProps) => {
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteItem = async (e: any, index: number) => {
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
      <NameWrapper>
        <Name>{presenter.name}</Name>
      </NameWrapper>
      <RoleWrapper>
        <Role>{presenter.role}</Role>
      </RoleWrapper>
      <AddressWrapper>
        <Address>{presenter.address}</Address>
      </AddressWrapper>
      <RoleWrapper>
        <Role>{presenter.phone}</Role>
      </RoleWrapper>
      {isEditing && (
        <AvailableWrapper>
          <p>Available:</p>
          <Checkbox
            disabled
            checked={presenter.available}
            inputProps={{ "aria-label": "controlled" }}
          />
        </AvailableWrapper>
      )}
      {isEditing && (
        <FormPresentersModal
          modifyValues={presenter}
          setUpdatePresenters={setUpdatePresenters}
        />
      )}
      {isEditing && (
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
