import React from "react";
import Presenter from "./Presenter/Presenter.view";
import { PresentersListWrapper } from "./PresentersList.styles";
import { PresenterType, RoleType, UserLogin } from "../../../../utils/types";

interface PresentersListProps {
  presenters: PresenterType[];
  setUpdatePresenters: Function;
  userLogin: UserLogin;
}

const PresentersList = ({
  presenters,
  setUpdatePresenters,
  userLogin,
}: PresentersListProps) => (
  <PresentersListWrapper>
    {presenters?.length > 0 &&
      presenters.map((presenter, index) => {
        if (userLogin?.role === RoleType.Boss) {
          return (
            presenter.role === RoleType.Employee && (
              <Presenter
                key={index}
                presenter={presenter}
                setUpdatePresenters={setUpdatePresenters}
                userLogin={userLogin}
              />
            )
          );
        } else {
          return (
            presenter.role === RoleType.Employee &&
            presenter.id === userLogin.id && (
              <Presenter
                key={index}
                presenter={presenter}
                setUpdatePresenters={setUpdatePresenters}
                userLogin={userLogin}
              />
            )
          );
        }
      })}
  </PresentersListWrapper>
);

export default PresentersList;
