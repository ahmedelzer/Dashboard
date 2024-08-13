import React, { useContext, useEffect, useState } from "react";

import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from "@devexpress/dx-react-core";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

const TransformerContainer = React.memo(
  ({
    popupComponent: Popup,
    postAction,
    putAction,
    state,
    setResult,
    result,
    schema,
    addSelectedList,
  }) => {
    return (
      <Plugin>
        <Template name="popupEditing">
          <TemplateConnector>
            {() => {
              return <Popup />;
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
);
export default TransformerContainer;
