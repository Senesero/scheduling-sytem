import React from "react";
import { PresentersWrapper } from "./PresentersPage.styles";
import PresentersList from "./components/PresentersList/PresentersList.view";
import FormPresenterModal from "./components/FormPresenterModal/FormPresenterModal";
import { PresenterType, RoleType, UserLogin } from "../../utils/types";

interface PresentersPageProps {
  presenters: PresenterType[];
  setUpdatePresenters: Function;
  userLogin: UserLogin;
}

const PresentersPage = ({
  presenters,
  setUpdatePresenters,
  userLogin,
}: PresentersPageProps) => {
  return (
    <PresentersWrapper>
      <h1>Presenters</h1>
      <PresentersList
        presenters={presenters}
        setUpdatePresenters={setUpdatePresenters}
        userLogin={userLogin}
      />
      {userLogin?.role === RoleType.Boss && (
        <FormPresenterModal setUpdatePresenters={setUpdatePresenters} />
      )}
    </PresentersWrapper>
  );
};

export default PresentersPage;
