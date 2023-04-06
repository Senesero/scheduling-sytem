import React, { useState } from "react";
import { Button } from "../../../../components/Button/Button";
import Modal from "@mui/material/Modal";
import FormPresenters from "../FormPresenters/FormPresenters.view";
import { Box } from "@mui/material";
import { PresenterType } from "../../../../utils/types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  overflow: "auto", // Para que muestre scroll vertical
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

interface FormPresentersModalProps {
  modifyValues?: PresenterType;
  setUpdatePresenters: Function;
}

const FormPresentersModal = ({
  modifyValues,
  setUpdatePresenters,
}: FormPresentersModalProps) => {
  const [openFormPresentersModal, setOpenFormPresentersModal] = useState(false);
  const handleOpenFormPresentersModal = () => setOpenFormPresentersModal(true);
  const handleCloseFormPresentersModal = () =>
    setOpenFormPresentersModal(false);

  const buttonName = modifyValues?.name
    ? "Modify presenter"
    : "Create presenter";

  return (
    <div>
      <Button primary onClick={handleOpenFormPresentersModal}>
        {buttonName}
      </Button>
      <Modal
        open={openFormPresentersModal}
        onClose={handleCloseFormPresentersModal}
      >
        <Box sx={style}>
          <FormPresenters
            modifyValues={modifyValues}
            handleCloseFormPresentersModal={handleCloseFormPresentersModal}
            setUpdatePresenters={setUpdatePresenters}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default FormPresentersModal;
