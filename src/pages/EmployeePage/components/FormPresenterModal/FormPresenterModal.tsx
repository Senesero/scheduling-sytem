import React, { useState } from "react";
import { Button } from "../../../../components/Button/Button";
import Modal from "@mui/material/Modal";
import FormPresenter from "../FormPresenter/FormPresenter.view";
import { Box } from "@mui/material";
import { PresenterType } from "../../../../utils/types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

interface FormPresenterModalProps {
  modifyValues?: PresenterType;
  setUpdatePresenters: Function;
}

const FormPresenterModal = ({
  modifyValues,
  setUpdatePresenters,
}: FormPresenterModalProps) => {
  const [openFormPresenterModal, setOpenFormPresenterModal] =
    useState<boolean>(false);
  const handleOpenFormPresenterModal = () => setOpenFormPresenterModal(true);
  const handleCloseFormPresenterModal = () => setOpenFormPresenterModal(false);

  const buttonName = modifyValues?.name
    ? "Modify presenter"
    : "Create presenter";

  return (
    <div>
      <Button primary onClick={handleOpenFormPresenterModal}>
        {buttonName}
      </Button>
      <Modal
        open={openFormPresenterModal}
        onClose={handleCloseFormPresenterModal}
      >
        <Box sx={style}>
          <FormPresenter
            modifyValues={modifyValues}
            handleCloseFormPresenterModal={handleCloseFormPresenterModal}
            setUpdatePresenters={setUpdatePresenters}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default FormPresenterModal;
