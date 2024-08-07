import React, { useContext, useEffect, useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import {
  Grid,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  TableSelection,
  // Table,
} from "@devexpress/dx-react-grid-bootstrap4";
import Table from "../DynamicTable/Table";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import "tailwindcss/tailwind.css";
import {
  EditingState,
  IntegratedPaging,
  IntegratedSelection,
  PagingState,
  SelectionState,
} from "@devexpress/dx-react-grid";
import WaringPop from "./WaringPop";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import { LanguageContext } from "../../../contexts/Language";
import DuringTransactionContainer from "./DuringTransactionContainer";
import BaseTable from "../DynamicTable/BaseTable";
import GetSchemaActionsUrl from "../../hooks/DashboardAPIs/GetSchemaActionsUrl";
import { defaultProjectProxyRoute } from "../../../request";
import FormContainerEditing from "./FormContainerEditing";
import { IsSecondListSubsetOfFirstList } from "./IsSecondListSubsetOfFirstList";
// const TransFormSchema = [
//   {
//     dashboardFormSchemaID: "8d8f94a8-78a1-409f-b7cc-ae0e4f277d66",
//     schemaType: "AvailableTableList",
//     idField: "postID",
//     dashboardFormSchemaInfoDTOView: {
//       dashboardFormSchemaID: "8d8f94a8-78a1-409f-b7cc-ae0e4f277d66",
//       schemaHeader: "Available Posts",
//       addingHeader: "New Post",
//       editingHeader: "Edit Post",
//     },
//     dashboardFormSchemaParameters: [
//       {
//         dashboardFormSchemaParameterID: "d6a2ae3c-7fc8-4239-b605-b0a075bf4fbb",
//         dashboardFormSchemaID: "8d8f94a8-78a1-409f-b7cc-ae0e4f277d66",
//         isEnable: false,
//         parameterType: "text",
//         parameterField: "postID",
//         parameterTitel: "Post ID",
//         isIDField: true,
//         lookupID: null,
//         lookupReturnField: null,
//         lookupDisplayField: null,
//         indexNumber: 0,
//       },
//       {
//         dashboardFormSchemaParameterID: "34f1fd25-ab3f-451c-93ad-89ac0a641508",
//         dashboardFormSchemaID: "8d8f94a8-78a1-409f-b7cc-ae0e4f277d66",
//         isEnable: true,
//         parameterType: "text",
//         parameterField: "postTitle",
//         parameterTitel: "Post Title",
//         isIDField: false,
//         lookupID: null,
//         lookupReturnField: null,
//         lookupDisplayField: null,
//         indexNumber: 1,
//       },
//       {
//         dashboardFormSchemaParameterID: "754d40c2-28ac-445e-8e62-c9e9a28776cc",
//         dashboardFormSchemaID: "8d8f94a8-78a1-409f-b7cc-ae0e4f277d66",
//         isEnable: true,
//         parameterType: "text",
//         parameterField: "postDescription",
//         parameterTitel: "Post Description",
//         isIDField: false,
//         lookupID: null,
//         lookupReturnField: null,
//         lookupDisplayField: null,
//         indexNumber: 2,
//       },
//     ],
//     isMainSchema: false,
//     dataSourceName: "",
//     projectProxyRoute: "BrandingMart",
//     propertyName: null,
//     indexNumber: 0,
//   },
//   {
//     dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
//     schemaType: "TransformTable",
//     idField: "homePostID",
//     dashboardFormSchemaInfoDTOView: {
//       dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
//       schemaHeader: "Home Posts",
//       addingHeader: "Home Posts Creator",
//       editingHeader: "Home Posts Editing",
//     },
//     dashboardFormSchemaParameters: [
//       {
//         dashboardFormSchemaParameterID: "ce99f99f-e998-47eb-8ae0-d49416b62521",
//         dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
//         isEnable: false,
//         parameterType: "text",
//         parameterField: "homePostID",
//         parameterTitel: "Home Post ID",
//         isIDField: true,
//         lookupID: null,
//         lookupReturnField: null,
//         lookupDisplayField: null,
//         indexNumber: 0,
//       },
//       {
//         dashboardFormSchemaParameterID: "e17193c9-26ef-4578-823a-790a5051a94a",
//         dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
//         isEnable: true,
//         parameterType: "datetime",
//         parameterField: "showTime",
//         parameterTitel: "Show Time",
//         isIDField: false,
//         lookupID: null,
//         lookupReturnField: null,
//         lookupDisplayField: null,
//         indexNumber: 1,
//       },
//       {
//         dashboardFormSchemaParameterID: "da30da53-331d-4698-b189-5a09362946ff",
//         dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
//         isEnable: true,
//         parameterType: "numeric",
//         parameterField: "duration",
//         parameterTitel: "Duration By Minute",
//         isIDField: false,
//         lookupID: null,
//         lookupReturnField: null,
//         lookupDisplayField: null,
//         indexNumber: 2,
//       },
//       {
//         dashboardFormSchemaParameterID: "511d30a3-7171-411d-9fb8-de717add1ca6",
//         dashboardFormSchemaID: "f6a7f028-bf0c-46be-8dbe-82cfa9adcf31",
//         isEnable: true,
//         parameterType: "text",
//         parameterField: "postID",
//         parameterTitel: "Post ID",
//         isIDField: false,
//         lookupID: "8d8f94a8-78a1-409f-b7cc-ae0e4f277d66",
//         lookupReturnField: "postID",
//         lookupDisplayField: "postTitle",
//         indexNumber: 3,
//       },
//     ],
//     isMainSchema: true,
//     dataSourceName: "",
//     projectProxyRoute: "BrandingMart",
//     propertyName: null,
//     indexNumber: 0,
//   },
// ];
// const schemaActions = [
//   {
//     dashboardFormSchemaActionID: "ae92a6cc-1715-47cc-a2a2-3a6a98913d1b",
//     dashboardFormActionMethodType: "Put",
//     routeAdderss: "Home/UpdateHomePost",
//     body: "",
//     returnPropertyName: "",
//     dashboardFormSchemaActionQueryParams: [],
//   },
//   {
//     dashboardFormSchemaActionID: "584e543d-d012-42c2-8ff9-7d433dd3b3cb",
//     dashboardFormActionMethodType: "Get",
//     routeAdderss: "Home/GetHomePosts",
//     body: "",
//     returnPropertyName: "",
//     dashboardFormSchemaActionQueryParams: [
//       {
//         dashboardFormSchemaActionQueryParameterID:
//           "e238c605-3877-4083-b474-2addcb0a61a5",
//         dashboardFormSchemaActionID: "584e543d-d012-42c2-8ff9-7d433dd3b3cb",
//         parameterName: "PageSize",
//         dashboardFormParameterField: "pageSize",
//       },
//       {
//         dashboardFormSchemaActionQueryParameterID:
//           "489800a0-5948-4323-9077-bb3d5802dbaa",
//         dashboardFormSchemaActionID: "584e543d-d012-42c2-8ff9-7d433dd3b3cb",
//         parameterName: "PageNumber",
//         dashboardFormParameterField: "pageIndex",
//       },
//     ],
//   },
//   {
//     dashboardFormSchemaActionID: "47805a12-451e-48d1-abc0-fec414f66dfd",
//     dashboardFormActionMethodType: "Post",
//     routeAdderss: "Home/AddHomePost",
//     body: "",
//     returnPropertyName: "",
//     dashboardFormSchemaActionQueryParams: [],
//   },
// ];
const TableTransformer = ({ TransFormSchema }) => {
  const [schema, setSchema] = useState([]);
  const [result, setResult] = useState([]);
  const [open, setOpen] = useState(false);
  const [leftSelectionContext, setLeftSelectionContext] = useState([{}]);
  const rightSchema = TransFormSchema.find((schema) => schema.isMainSchema); //baseTable
  const leftSchema = TransFormSchema.find((schema) => !schema.isMainSchema); //Table
  const {
    data: schemaActions,
    error,
    isLoading,
  } = useFetch(
    GetSchemaActionsUrl(rightSchema.dashboardFormSchemaID),
    defaultProjectProxyRoute
  );
  const getAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );
  const postAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Post"
    );
  const deleteAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Delete"
    );
  console.log("====================================");
  console.log(rightSchema.dashboardFormSchemaParameters);
  console.log(leftSchema.dashboardFormSchemaParameters);
  console.log("====================================");
  const [leftSelection, setLeftSelection] = useState([]);
  const [rightSelection, setRightSelection] = useState([]);

  const isSubset = IsSecondListSubsetOfFirstList(
    rightSchema.dashboardFormSchemaParameters,
    leftSchema.dashboardFormSchemaParameters,
    ["parameterField"]
  );

  const TransformData = (
    selection,
    setSelectionContext,
    setSelection,
    addedSchema,
    removedSchema
  ) => {
    console.log(isSubset, "isSubset");

    if (!isSubset) {
      setOpen(true);
      setSelection([]);
    }
    setSelectionContext(leftSelection);
  };
  return (
    <div>
      <div className="flex justify-around p-4 space-x-4 items-start flex-col lg:flex-row">
        <div className="lg:w-[calc(50%-50px)] p-4 border rounded">
          {/* {rightSchema &&
            rightSchema.map((schema) => ( */}
          <Table
            key={leftSchema?.idField}
            schema={leftSchema}
            selectionRow={true}
            isSearchingTable={false}
            deleteMessage={false}
            addMessage={true}
            editMessage={false}
            selection={leftSelection}
            setSelection={setLeftSelection}
            addSelectedList={true}
          />
          {/* ))} */}
        </div>
        <div className="flex flex-col lg:flex-col justify-center items-center space-y-4 w-[100px]">
          <button
            name="addButton"
            onClick={() =>
              TransformData(
                leftSelection,
                setLeftSelectionContext,
                setLeftSelection,
                rightSchema,
                leftSchema
              )
            }
            className="px-4 py-2 bg text-white rounded-full"
          >
            <FaArrowAltCircleRight size={22} />
          </button>
          <button
            name="removeButton"
            onClick={() =>
              TransformData(
                rightSelection,
                setLeftSelectionContext,
                setRightSelection,
                leftSchema
              )
            }
            className="px-4 py-2 bg text-white rounded-full"
          >
            <FaArrowAltCircleLeft size={22} />
          </button>
        </div>
        <div className="lg:w-[calc(50%-50px)] p-4 border rounded">
          {/* {rightSchema &&
            rightSchema.map((schema) => ( */}
          <Table
            key={rightSchema?.idField}
            schema={rightSchema}
            isSearchingTable={false}
            deleteMessage={false}
            addMessage={false}
            editMessage={false}
            selectionRow={true}
            selection={rightSelection}
            setSelection={setRightSelection}
            schemaActions={schemaActions}
          />
          {/* ))} */}
        </div>
      </div>
      {/* <FormContainerEditing
        formContainerComponent={DuringTransaction}
        postAction={postAction}
        putAction={{}}
        state={{}}
        setResult={setResult}
        result={result}
        // schema={leftSchema}
      /> */}

      <DuringTransactionContainer
        tableSchema={rightSchema}
        leftSelectionContext={leftSelectionContext}
        isSubset={isSubset}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};
export default TableTransformer;
