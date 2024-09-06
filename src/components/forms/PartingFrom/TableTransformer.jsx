import React, { useContext, useState } from "react";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaArrowAltCircleUp,
} from "react-icons/fa";
import "tailwindcss/tailwind.css";
import { LanguageContext } from "../../../contexts/Language";
import { defaultProjectProxyRoute } from "../../../request";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import GetSchemaActionsUrl from "../../hooks/DashboardAPIs/GetSchemaActionsUrl";
import Table from "../DynamicTable/Table";
import DuringTransactionContainer from "./DuringTransactionContainer";
import { IsSecondListSubsetOfFirstList } from "./IsSecondListSubsetOfFirstList";
import { styles } from "./styles";
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
  const { Right } = useContext(LanguageContext);

  const [trigger, setTrigger] = useState(0);
  const [schema, setSchema] = useState(0);
  const [action, setAction] = useState(0);
  const [automated, setAutomated] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectionContext, setSelectionContext] = useState([]);
  const rightSchema = TransFormSchema.find((schema) => schema.isMainSchema); //baseTable
  const leftSchema = TransFormSchema.find((schema) => !schema.isMainSchema); //Table
  const rightSchemaWithoutID = rightSchema.dashboardFormSchemaParameters.filter(
    (schema) => !schema.isIDField
  );
  const {
    data: schemaActions,
    error,
    isLoading,
  } = useFetch(
    GetSchemaActionsUrl(rightSchema.dashboardFormSchemaID),
    defaultProjectProxyRoute
  );
  // const getAction =
  //   schemaActions &&
  //   schemaActions.find(
  //     (action) => action.dashboardFormActionMethodType === "Get"
  //   );
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
  const [leftSelection, setLeftSelection] = useState([]);
  const [rightSelection, setRightSelection] = useState([]);

  const isSubset = IsSecondListSubsetOfFirstList(
    leftSchema.dashboardFormSchemaParameters,
    rightSchemaWithoutID,
    ["parameterField"]
  );
  const RefreshTable = () => {
    setTrigger((prevTrigger) => prevTrigger + 1); // Increment trigger
  };

  const TransformData = (
    selection,
    setSelectionContext,
    setSelection,
    schema,
    actionSchema
  ) => {
    if (selection.length > 0) {
      setOpen(!isSubset);
      setSelectionContext(selection);
      setAction(actionSchema);
      setSchema(schema);
      setSelection([]);
      setAutomated(isSubset);
    }
  };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.tableContainer}>
          <Table
            key={trigger}
            schema={leftSchema}
            selectionRow={true}
            isSearchingTable={false}
            deleteMessage={false}
            addMessage={true}
            editMessage={true}
            selection={leftSelection}
            setSelection={setLeftSelection}
            addSelectedList={true}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button
            hidden={!postAction}
            name="addButton"
            onClick={() =>
              TransformData(
                leftSelection,
                setSelectionContext,
                setLeftSelection,
                rightSchema,
                postAction
              )
            }
            className={styles.button}
          >
            <div className={styles.smallScreenIcon}>
              <FaArrowAltCircleDown size={22} />
            </div>
            <div className={styles.largeScreenIcon}>
              {Right ? (
                <FaArrowAltCircleLeft size={22} />
              ) : (
                <FaArrowAltCircleRight size={22} />
              )}
            </div>
          </button>
          <button
            hidden={!deleteAction}
            name="removeButton"
            onClick={() =>
              TransformData(
                rightSelection,
                setSelectionContext,
                setRightSelection,
                leftSchema,
                deleteAction
              )
            }
            className={styles.button}
          >
            <div className={styles.smallScreenIcon}>
              <FaArrowAltCircleUp size={22} />
            </div>
            <div className={styles.largeScreenIcon}>
              {Right ? (
                <FaArrowAltCircleRight size={22} />
              ) : (
                <FaArrowAltCircleLeft size={22} />
              )}
            </div>
          </button>
        </div>
        <div className={styles.tableContainer}>
          <Table
            // key={rightSchema?.idField}
            key={trigger}
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
        </div>
      </div>
      <DuringTransactionContainer
        setSelectionContext={setSelectionContext}
        tableSchema={schema}
        selectionContext={selectionContext}
        automated={automated}
        open={open}
        TransformDone={RefreshTable}
        action={action}
        setOpen={setOpen}
      />
    </div>
  );
};
export default TableTransformer;
