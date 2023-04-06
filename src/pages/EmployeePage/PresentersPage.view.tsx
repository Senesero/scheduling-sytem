import React from "react";
import { PresentersWrapper } from "./PresentersPage.styles";
import PresentersList from "./components/PresentersList/PresentersList.view";
import FormPresentersModal from "./components/FormPresentersModal/FormPresentersModal";
import { PresenterType } from "../../utils/types";

interface PresentersPageProps {
  isEditing?: boolean;
  presenters: PresenterType[];
  setUpdatePresenters: Function;
}

const PresentersPage = ({
  isEditing,
  presenters,
  setUpdatePresenters,
}: PresentersPageProps) => {
  return (
    <PresentersWrapper>
      {isEditing && <h1>Presenters</h1>}
      <PresentersList
        isEditing={isEditing}
        presenters={presenters}
        setUpdatePresenters={setUpdatePresenters}
      />
      {isEditing && (
        <FormPresentersModal setUpdatePresenters={setUpdatePresenters} />
      )}
    </PresentersWrapper>
  );
};

export default PresentersPage;
