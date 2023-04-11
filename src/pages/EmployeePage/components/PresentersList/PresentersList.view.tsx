import React from "react";
import Presenter from "./Presenter/Presenter.view";
import { PresentersListWrapper } from "./PresentersList.styles";
import { PresenterType, RoleType } from "../../../../utils/types";

interface PresentersListProps {
  presenters: PresenterType[];
  setUpdatePresenters: Function;
}

const PresentersList = ({
  presenters,
  setUpdatePresenters,
}: PresentersListProps) => {
  return (
    <PresentersListWrapper>
      {presenters?.length > 0 &&
        presenters.map(
          (presenter, index) =>
            presenter.role === RoleType.Employee && (
              <Presenter
                key={index}
                presenter={presenter}
                setUpdatePresenters={setUpdatePresenters}
              />
            )
        )}
    </PresentersListWrapper>
  );
};

export default PresentersList;
