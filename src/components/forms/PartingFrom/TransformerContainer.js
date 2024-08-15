import React, { useState } from "react";
import FormContainer from "../DynamicPopup/FormContainer";
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from "@devexpress/dx-react-core";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

const TransformerContainer = React.memo(() => {
  const [editedRow, setEditedRow] = useState({}); // Use state to manage editedRow

  const schema = {
    dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
    schemaType: "TransformTable",
    idField: "homePostID",
    dashboardFormSchemaInfoDTOView: {
      dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
      schemaHeader: "Home Posts",
      addingHeader: "Home Posts Creator",
      editingHeader: "Home Posts Editing",
    },
    dashboardFormSchemaParameters: [
      {
        dashboardFormSchemaParameterID: "ce99f99f-e998-47eb-8ae0-d49416b62521",
        dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
        isEnable: false,
        parameterType: "text",
        parameterField: "homePostID",
        parameterTitel: "Home Post ID",
        isIDField: true,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 0,
      },
      {
        dashboardFormSchemaParameterID: "e17193c9-26ef-4578-823a-790a5051a94a",
        dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
        isEnable: true,
        parameterType: "datetime",
        parameterField: "showTime",
        parameterTitel: "Show Time",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 1,
      },
      {
        dashboardFormSchemaParameterID: "da30da53-331d-4698-b189-5a09362946ff",
        dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
        isEnable: true,
        parameterType: "numeric",
        parameterField: "duration",
        parameterTitel: "Duration By Minute",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 2,
      },
      {
        dashboardFormSchemaParameterID: "511d30a3-7171-411d-9fb8-de717add1ca6",
        dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
        isEnable: true,
        parameterType: "text",
        parameterField: "postID",
        parameterTitel: "Post ID",
        isIDField: false,
        lookupID: "8d8f94a8-78a1-409f-b7cc-ae0e4f277d66",
        lookupReturnField: "postID",
        lookupDisplayField: "postTitle",
        indexNumber: 3,
      },
    ],
    isMainSchema: true,
    dataSourceName: "",
    projectProxyRoute: "BrandingMart",
    propertyName: null,
    indexNumber: 0,
  };

  const handleButtonClick = () => {
    console.log("Edited Row:", editedRow); // Log the current edited row
  };

  return (
    // <Plugin>
    //   <Template name="aaj">
    //     <TemplateConnector>
    // <div>
    //   {() => (
    <>
      <FormContainer
        tableSchema={schema}
        row={editedRow}
        setRow={setEditedRow}
        // onChange={(newValues) => setEditedRow(newValues)} // Update state with new form values
      />
      <button onClick={handleButtonClick}>Log Edited Row</button>
    </>
    //   )}
    // </div>
    //     </TemplateConnector>
    //   </Template>
    //   <Template name="root">
    //     <TemplatePlaceholder />
    //     <TemplatePlaceholder name="popupEditing" />
    //   </Template>
    // </Plugin>
  );
});

export default TransformerContainer;
