import React from "react";
import { TablesPageWrapper } from "./TablesPage.styles";
import TablesList from "./components/TablesList/TablesList.view";
import FormTablesModal from "./components/FormTablesModal/FormTablesModal";
import { TableType } from "../../utils/types";

interface TablesPageProps {
  tables: TableType[];
  setUpdateTables: Function;
}

const TablesPage = ({ tables, setUpdateTables }: TablesPageProps) => {
  return (
    <TablesPageWrapper>
      <h1>Tables</h1>
      <TablesList tables={tables} setUpdateTables={setUpdateTables} />
      <FormTablesModal setUpdateTables={setUpdateTables} />
    </TablesPageWrapper>
  );
};

export default TablesPage;
