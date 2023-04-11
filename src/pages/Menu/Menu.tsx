import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Nav, Ul, Li, A } from "./Menu.styles";
import { setItem } from "../../utils/localStorage";
import { Button } from "../../components/Button/Button";
import { RoleType, UserLogin } from "../../utils/types";

interface MenuProps {
  setCheckLogin: Function;
  userLogin: UserLogin;
}

const Menu = ({ setCheckLogin, userLogin }: MenuProps) => {
  const navigate = useNavigate();

  const onSubmitCloseSession = () => {
    setItem("session", {});
    setCheckLogin(true);
    navigate("");
  };

  return (
    <>
      <Nav>
        <Ul>
          <Li>
            <A to="/">Home</A>
          </Li>
          {userLogin?.user && (
            <>
              <Li>
                <A to="/presenters">Presenters</A>
              </Li>
              {userLogin?.role === RoleType.Boss && (
                <Li>
                  <A to="/tables">Tables</A>
                </Li>
              )}
              <Li>
                <A to="/schedule">Schedule</A>
              </Li>
            </>
          )}
        </Ul>
        {userLogin?.user && (
          <div>
            <Button primary onClick={onSubmitCloseSession}>
              Close session
            </Button>
          </div>
        )}
      </Nav>

      <Outlet />
    </>
  );
};

export default Menu;
