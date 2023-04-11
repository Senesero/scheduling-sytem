import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.view";
import PresentersPage from "./pages/EmployeePage/PresentersPage.view";
import TablesPage from "./pages/TablesPage/TablesPage.view";
import SchedulePage from "./pages/SchedulePage/SchedulePage.view";
import Menu from "./pages/Menu/Menu";
import { PresenterType, RoleType, TableType, UserLogin } from "./utils/types";
import { getTables, getPresenters } from "./utils/api";
import { getItem } from "./utils/localStorage";

function App() {
  const [presenters, setPresenters] = useState<PresenterType[]>([]);
  const [updatePresenters, setUpdatePresenters] = useState<boolean>(false);
  const [tables, setTables] = useState<TableType[]>([]);
  const [updateTables, setUpdateTables] = useState<boolean>(false);
  const [userLogin, setUserLogin] = useState<UserLogin>(getItem("session"));
  const [checkLogin, setCheckLogin] = useState<boolean>(false);

  useEffect(() => {
    const getPresentersData = async () => {
      const user = getItem("session");
      setUserLogin(user);
      setCheckLogin(false);
    };

    getPresentersData();
  }, [checkLogin]);

  useEffect(() => {
    const getPresentersData = async () => {
      const data = await getPresenters();
      setPresenters(data);
      setUpdatePresenters(false);
    };

    getPresentersData();
  }, [updatePresenters]);

  useEffect(() => {
    const getTableData = async () => {
      const data = await getTables();
      setTables(data);
      setUpdateTables(false);
    };

    getTableData();
  }, [updateTables]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Menu setCheckLogin={setCheckLogin} userLogin={userLogin} />
            }
          >
            <Route
              index
              element={
                <HomePage
                  userLogin={userLogin}
                  presenters={presenters}
                  setCheckLogin={setCheckLogin}
                />
              }
            />

            {userLogin?.user && (
              <>
                <Route
                  path="presenters"
                  element={
                    <PresentersPage
                      presenters={presenters}
                      setUpdatePresenters={setUpdatePresenters}
                      userLogin={userLogin}
                    />
                  }
                />
                {userLogin?.role === RoleType.Boss && (
                  <Route
                    path="tables"
                    element={
                      <TablesPage
                        tables={tables}
                        setUpdateTables={setUpdateTables}
                      />
                    }
                  />
                )}
                <Route
                  path="schedule"
                  element={
                    <SchedulePage
                      userLogin={userLogin}
                      presenters={presenters}
                      tables={tables}
                    />
                  }
                />
              </>
            )}
            <Route path="*" element={<div>Page not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
