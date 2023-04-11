import React, { useState } from "react";
import { Checkbox, CircularProgress } from "@mui/material";
import { Button } from "../../../../../components/Button/Button";
import FormTablesModal from "../../FormTablesModal/FormTablesModal";
import { TableWrapper, Game, Text, CheckWrapper } from "./Table.styles";
import { TableType } from "../../../../../utils/types";
import { deleteTable } from "../../../../../utils/api";
import { timeDelay } from "../../../../../utils/constants";

interface TableProps {
  tables: TableType;
  setUpdateTables: Function;
}

const Table = ({ tables, setUpdateTables }: TableProps) => {
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
      deleteTable(index);
      setDeleteLoading(false);
      setUpdateTables(true);
    }, timeDelay);
  };

  return (
    <TableWrapper>
      <div>
        <Game>{tables.game}</Game>
      </div>
      <div>
        <Text>{`Room: ${tables.room}`}</Text>
      </div>
      <div>
        <Text>{`Number of players: ${tables.numberOfPlayers}`}</Text>
      </div>
      <>
        <CheckWrapper>
          <p>Available:</p>
          <Checkbox
            disabled
            checked={tables.available}
            inputProps={{ "aria-label": "controlled" }}
          />
        </CheckWrapper>
        <CheckWrapper>
          <p>Working:</p>
          <Checkbox
            disabled
            checked={tables.working}
            inputProps={{ "aria-label": "controlled" }}
          />
        </CheckWrapper>
      </>
      <FormTablesModal
        modifyValues={tables}
        setUpdateTables={setUpdateTables}
      />
      <div>
        <Button onClick={(e) => deleteItem(e, tables.id)}>
          {deleteLoading ? <CircularProgress size={24} /> : "Delete"}
        </Button>
      </div>
    </TableWrapper>
  );
};

export default Table;
