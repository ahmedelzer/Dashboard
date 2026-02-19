import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import React, { useContext, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { LanguageContext } from "../../../contexts/Language";
import FormContainer from "./FormContainer";
import DotsLoading from "../../loading/DotsLoading";
import Loading from "../../loading/Loading";
import { LoadIndicator } from "devextreme-react";
import { IoCloseCircle } from "react-icons/io5";
const Popup = ({
  open,
  row,
  onApplyChanges,
  onCancelChanges,
  tableSchema,
  errorResult,
  isNewRow,
  subSchemas,
}) => {
  const { localization, Right } = useContext(LanguageContext);
  const [doneButtonText, setDoneButtonText] = useState(
    localization.popup.submitButton,
  );
  const [doneButtonDisable, setDoneButtonDisable] = useState(false);
  const testSchema = {
    dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
    idField: "nodeMenuItemID",
    dashboardFormSchemaInfoDTOView: {
      dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
      schemaHeader: "Menu Items",
      addingHeader: "Add Menu Item",
      editingHeader: "Edit Menu Item",
    },
    dashboardFormSchemaParameters: [
      {
        dashboardFormSchemaParameterID: "becbe003-c853-4e1c-916b-9adc90524bdc",
        dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
        isEnable: false,
        parameterType: "text",
        parameterField: "nodeMenuItemID",
        parameterTitel: "Node Menu Item ID",
        parameterLookupTitel: "Node Menu Item ID",
        isIDField: true,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 0,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
      {
        dashboardFormSchemaParameterID: "d6435646-9a1a-4a72-b0f4-b1605c3725cb",
        dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
        isEnable: true,
        parameterType: "text",
        parameterField: "menuItemID",
        parameterTitel: "Menu Item ID",
        parameterLookupTitel: "Menu Item Name",
        isIDField: false,
        lookupID: "1a184bfd-6090-4da8-b2bc-7f985ddab771",
        lookupReturnField: "menuItemID",
        lookupDisplayField: "menuItemName",
        indexNumber: 1,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
      {
        dashboardFormSchemaParameterID: "dc306e4d-f19b-42d2-b01f-34397bb4c711",
        dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
        isEnable: true,
        parameterType: "dependLookup",
        parameterField: "nodeID",
        parameterTitel: "Node",
        parameterLookupTitel: null,
        isIDField: false,
        // lookupID: "1a184bfd-6090-4da8-b2bc-7f985ddab771",
        // lookupReturnField: "menuItemID",
        // lookupDisplayField: "menuItemName",
        lookupID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
        lookupReturnField: "nodeID",
        lookupDisplayField: "nodeName",
        indexNumber: 2,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [
          {
            dashboardFormSchemaParameterDependencyID:
              "873ab5e5-3bac-44f8-9bb7-dce3cf017fc5",
            dashboardFormSchemaParameterID:
              "dc306e4d-f19b-42d2-b01f-34397bb4c711",
            dependDashboardFormSchemaParameterID:
              "d6435646-9a1a-4a72-b0f4-b1605c3725cb",
          },
        ],
      },
      {
        dashboardFormSchemaParameterID: "3f445744-39a6-41ab-9d6b-d70a5dee0626",
        dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
        isEnable: false,
        parameterType: "rate",
        parameterField: "rate",
        parameterTitel: "Rate",
        parameterLookupTitel: "Rate",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 4,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
      {
        dashboardFormSchemaParameterID: "58929345-5d93-408a-b733-a2b853dedffa",
        dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
        isEnable: false,
        parameterType: "orders",
        parameterField: "numberOfOrders",
        parameterTitel: "Number Of Orders",
        parameterLookupTitel: "Number Of Orders",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 5,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
      {
        dashboardFormSchemaParameterID: "5e156ca1-2df3-4829-a87a-24becfe43754",
        dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
        isEnable: false,
        parameterType: "reviews",
        parameterField: "numberOfReviews",
        parameterTitel: "Number Of Reviews",
        parameterLookupTitel: "Number Of Reviews",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 6,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
      {
        dashboardFormSchemaParameterID: "92ea9c87-97e2-459a-a7f2-8a0ef1d117cd",
        dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
        isEnable: false,
        parameterType: "likes",
        parameterField: "numberOfLikes",
        parameterTitel: "NumberOfLikes",
        parameterLookupTitel: "NumberOfLikes",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 7,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
      {
        dashboardFormSchemaParameterID: "2d38a825-380e-43dd-9e97-91a808a4ad31",
        dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
        isEnable: false,
        parameterType: "dislikes",
        parameterField: "numberOfDislikes",
        parameterTitel: "NumberOfDislikes",
        parameterLookupTitel: "NumberOfDislikes",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 8,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
      {
        dashboardFormSchemaParameterID: "41e16f1a-32af-4b83-9c05-2b0fbd9a2b19",
        dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
        isEnable: true,
        parameterType: "boolean",
        parameterField: "isActive",
        parameterTitel: "Active",
        parameterLookupTitel: "Active",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 10,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
      {
        dashboardFormSchemaParameterID: "c5e70338-5dc2-4186-980c-23d103c39d71",
        dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
        isEnable: true,
        parameterType: "boolean",
        parameterField: "isAvailable",
        parameterTitel: "Available",
        parameterLookupTitel: "Available",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 11,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
      {
        dashboardFormSchemaParameterID: "9235b8e2-71a5-4b8c-8362-df14feaf55d1",
        dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
        isEnable: true,
        parameterType: "float",
        parameterField: "cost",
        parameterTitel: "Cost",
        parameterLookupTitel: "Cost",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 12,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
      {
        dashboardFormSchemaParameterID: "427cdf19-b30f-4e47-816d-3ad90b0987f7",
        dashboardFormSchemaID: "d3efa45e-4793-4a57-a96f-db3525c44f97",
        isEnable: true,
        parameterType: "float",
        parameterField: "price",
        parameterTitel: "Price",
        parameterLookupTitel: "Price",
        isIDField: false,
        lookupID: null,
        lookupReturnField: null,
        lookupDisplayField: null,
        indexNumber: 13,
        isFilterOperation: true,
        dashboardFormSchemaParameterDependencies: [],
      },
    ],
    projectProxyRoute: "BrandingMartPOS",
  };
  return (
    <Modal
      isOpen={open}
      onClose={() => (open = false)}
      aria-labelledby="form-dialog-title"
    >
      <ModalHeader id="form-dialog-title" className="relative">
        <span>
          {isNewRow
            ? tableSchema.dashboardFormSchemaInfoDTOView.addingHeader
            : tableSchema.dashboardFormSchemaInfoDTOView.editingHeader}
        </span>
        <div
          className={`flex justify-between items-center absolute top-5 ${
            Right ? "left-5" : "right-5"
          }`}
        >
          <IoCloseCircle
            size={30}
            className="cursor-pointer"
            onClick={onCancelChanges} // Close the modal on X click
          />
        </div>
      </ModalHeader>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setDoneButtonText(
            <LoadIndicator width={"24px"} height={"24px"} visible={true} />,
          );
          setDoneButtonDisable(true);
          await onApplyChanges(e);
          setDoneButtonText(localization.popup.submitButton);
          setDoneButtonDisable(false);
          /////////////
          // const form = e.target;
          // const formData = new FormData(form);
          // const fileData = JSON.stringify(formData, null, 2); // Format nicely
          // const blob = new Blob([fileData], { type: "application/json" });
          // const url = URL.createObjectURL(blob);

          // const link = document.createElement("a");
          // link.href = url;
          // link.download = "myfile.json";
          // document.body.appendChild(link);
          // link.click();
          // document.body.removeChild(link);
          // URL.revokeObjectURL(url);
        }}
        action=""
      >
        <ModalBody>
          <FormContainer
            tableSchema={tableSchema}
            row={row}
            returnRow={() => {}}
            errorResult={errorResult}
            subSchemas={subSchemas}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onCancelChanges}
            className="pop"
            disabled={doneButtonDisable}
          >
            {localization.popup.cancelButton}
          </Button>{" "}
          <Button type="submit" className="pop" disabled={doneButtonDisable}>
            {doneButtonText}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default Popup;
