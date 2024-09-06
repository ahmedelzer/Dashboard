import React, { useContext } from "react";
import { Button } from "reactstrap";
import { LanguageContext } from "../../../contexts/Language";
import Searching from "./Searching";
import { panelActionsStyle } from "./styles";
function PanelActions({ SearchComponent, panelOpen, setPanelOpen }) {
  const { localization } = useContext(LanguageContext);

  return (
    <div className={panelActionsStyle.containerWithButton}>
      <div className={panelActionsStyle.buttonContainer}>
        <Button
          className={panelActionsStyle.button}
          onClick={() => setPanelOpen(true)}
        >
          {localization.panelActions.button.search}
        </Button>
        <Searching open={panelOpen} SearchForm={SearchComponent} />
        <Button type="submit" className="pop">
          {localization.panelActions.button.clear}
        </Button>
      </div>
    </div>
  );
}

export default PanelActions;
