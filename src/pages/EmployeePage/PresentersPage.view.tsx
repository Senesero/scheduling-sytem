import React from "react";
import { PresentersWrapper } from "./PresentersPage.styles";
import PresentersList from "./components/PresentersList/PresentersList.view";
import FormPresenterModal from "./components/FormPresenterModal/FormPresenterModal";
import { PresenterType } from "../../utils/types";

interface PresentersPageProps {
  presenters: PresenterType[];
  setUpdatePresenters: Function;
}

const PresentersPage = ({
  presenters,
  setUpdatePresenters,
}: PresentersPageProps) => {
  return (
    <PresentersWrapper>
      <h1>Presenters</h1>
      <PresentersList
        presenters={presenters}
        setUpdatePresenters={setUpdatePresenters}
      />
      <FormPresenterModal setUpdatePresenters={setUpdatePresenters} />
    </PresentersWrapper>
  );
};

export default PresentersPage;
