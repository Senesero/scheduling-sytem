import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import PresentersPage from "./pages/EmployeePage/PresentersPage.view";
import TablesPage from "./pages/TablesPage/TablesPage.view";
import SchedulePage from "./pages/SchedulePage/SchedulePage.view";
import Menu from "./pages/Menu/Menu";
import { PresenterType, TableType } from "./utils/types";
import { getTables, getPresenters } from "./utils/api";

function App() {
  const [presenters, setPresenters] = useState<PresenterType[]>([]);
  const [updatePresenters, setUpdatePresenters] = useState<boolean>(false);
  const [tables, setTables] = useState<TableType[]>([]);
  const [updateTables, setUpdateTables] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPresentersData = async () => {
      const data = await getPresenters();
      setPresenters(data);
      setLoading(false);
      setUpdatePresenters(false);
    };

    getPresentersData();
  }, [updatePresenters]);

  useEffect(() => {
    const getTableData = async () => {
      const data = await getTables();
      setTables(data);
      setLoading(false);
      setUpdateTables(false);
    };

    getTableData();
  }, [updateTables]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route index element={<HomePage />} />
            <Route
              path="presenters"
              element={
                <PresentersPage
                  presenters={presenters}
                  setUpdatePresenters={setUpdatePresenters}
                />
              }
            />
            <Route
              path="tables"
              element={
                <TablesPage tables={tables} setUpdateTables={setUpdateTables} />
              }
            />
            <Route
              path="schedule"
              element={<SchedulePage presenters={presenters} tables={tables} />}
            />
            <Route path="*" element={<div>Page not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
