import React, { useState } from "react";
import { Button } from "../../../../components/Button/Button";
import Modal from "@mui/material/Modal";
import FormTables from "../FormTables/FormTables.view";
import { Box } from "@mui/material";
import { TableType } from "../../../../utils/types";

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

interface FormTablesModalProps {
  modifyValues?: TableType;
  setUpdateTables: Function;
}

const FormTablesModal = ({
  modifyValues,
  setUpdateTables,
}: FormTablesModalProps) => {
  const [openFormTablesModal, setOpenFormTablesModal] =
    useState<boolean>(false);
  const handleOpenFormTablesModal = () => setOpenFormTablesModal(true);
  const handleCloseFormTablesModal = () => setOpenFormTablesModal(false);

  const buttonName = modifyValues?.game ? "Modify table" : "Create table";

  return (
    <div>
      <Button primary onClick={handleOpenFormTablesModal}>
        {buttonName}
      </Button>
      <Modal open={openFormTablesModal} onClose={handleCloseFormTablesModal}>
        <Box sx={style}>
          <FormTables
            modifyValues={modifyValues}
            handleCloseFormTablesModal={handleCloseFormTablesModal}
            setUpdateTables={setUpdateTables}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default FormTablesModal;
