import React from "react";
import { HomeWrapper } from "./HomePage.styles";
import { PresenterType, RoleType, UserLogin } from "../../utils/types";
import LoginForm from "./LoginForm/LoginForm.view";

interface HomePageProps {
  presenters: PresenterType[];
  setCheckLogin: Function;
  userLogin: UserLogin;
}

const HomePage = ({ presenters, setCheckLogin, userLogin }: HomePageProps) => {
  return (
    <HomeWrapper data-testid="home-page">
      <div>
        <h2>
          {userLogin?.user
            ? `Welcome ${userLogin.user}`
            : "Welcome to React Schedule"}
        </h2>
        {userLogin?.user && userLogin?.role === RoleType.Employee && (
          <h3>You can check your work shift in Schedule</h3>
        )}
      </div>
      {!userLogin?.user && (
        <LoginForm presenters={presenters} setCheckLogin={setCheckLogin} />
      )}
    </HomeWrapper>
  );
};

export default HomePage;
