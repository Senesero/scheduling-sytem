import React from "react";
import Table from "./Table/Table.view";
import { TablesListWrapper } from "./TablesList.styles";
import { TableType } from "../../../../utils/types";

interface TablesListProps {
  tables: TableType[];
  setUpdateTables: Function;
}

const TablesList = ({ tables, setUpdateTables }: TablesListProps) => {
  return (
    <TablesListWrapper>
      {tables?.length > 0 &&
        tables.map((tables, index) => (
          <Table
            key={index}
            tables={tables}
            setUpdateTables={setUpdateTables}
          />
        ))}
    </TablesListWrapper>
  );
};

export default TablesList;
