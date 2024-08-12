import React from "react";
import ImageParameterWithPanelActions from "../inputs/InputActions/ImageParameterWithPanelActions";
import { Onchange } from "../hooks/FormsFunctions/OnchangeClass";
import TableTransformer from "./PartingFrom/TableTransformer";
// import DisplayFile from "./PartingFrom/DisplayFile";
// import FileInput from "./PartingFrom/FileInput";
// import UploadAction from "../inputs/InputActins/UploadAction";
// import BrowserUrlAction from "../inputs/InputActins/BrowserUrlAction";
// import WebcamActions from "../inputs/InputActins/WebcamActins";
import FormContainer from "../forms/DynamicPopup/FormContainer";
let schema = {
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

function Data() {
  // const onChange = new Onchange({}).UpdateRow;
  // let props = {
  //   fieldName: "image",
  //   title: "",
  //   value: "",
  //   enable: true,
  //   type: "file",
  //   onChange: onChange,
  // };
  return (
    <>
      <TableTransformer />
    </>
  );
  // function handleSubmit(e) {
  //   // Prevent the browser from reloading the page
  //   e.preventDefault();

  //   // Read the form data
  //   const form = e.target;
  //   const formData = new FormData(form);
  //   // Or you can work with it as a plain object:
  //   const formJson = Object.fromEntries(formData.entries());
  //   console.log(12, formJson);
  // }

  // return (
  //   <form method="post" onSubmit={handleSubmit}>
  //     <label>
  //       Text input: <input name="myInput" defaultValue="Some initial value" />
  //     </label>
  //     <hr />
  //     <label>
  //       Checkbox:{" "}
  //       <input type="checkbox" name="myCheckbox" defaultChecked={true} />
  //     </label>
  //     <hr />
  //     <p>
  //       Radio buttons:
  //       <label>
  //         <input type="radio" name="myRadio" value="option1" /> Option 1
  //       </label>
  //       <label>
  //         <input
  //           type="radio"
  //           name="myRadio"
  //           value="option2"
  //           defaultChecked={true}
  //         />{" "}
  //         Option 2
  //       </label>
  //       <label>
  //         <input type="radio" name="myRadio" value="option3" /> Option 3
  //       </label>
  //     </p>
  //     <hr />
  //     <button type="reset">Reset form</button>
  //     <button type="submit">Submit form</button>
  //   </form>
  // );
}

export default Data;
