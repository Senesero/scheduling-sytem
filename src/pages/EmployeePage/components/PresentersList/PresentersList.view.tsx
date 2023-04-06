import React from "react";
import Presenter from "./Presenter/Presenter.view";
import { PresentersListWrapper } from "./PresentersList.styles";
import { PresenterType, Role } from "../../../../utils/types";

interface PresentersListProps {
  isEditing?: boolean;
  presenters: PresenterType[];
  setUpdatePresenters: Function;
}

const PresentersList = ({
  isEditing,
  presenters,
  setUpdatePresenters,
}: PresentersListProps) => {
  return (
    <PresentersListWrapper>
      {presenters.length > 0 &&
        presenters.map(
          (presenter, index) =>
            presenter.role === Role.Employee && (
              <Presenter
                key={index}
                presenter={presenter}
                isEditing={isEditing}
                setUpdatePresenters={setUpdatePresenters}
              />
            )
        )}
    </PresentersListWrapper>
  );
};

export default PresentersList;
