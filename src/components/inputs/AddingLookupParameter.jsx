import React, { useContext, useState } from "react";
import {
  Button,
  Modal,
  ModalBody as ReactstrapModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
// import FormContainer from "../../DynamicPopup/FormContainer";
// import { browserActionsStyle } from "./InputActions/styles";
// import useFetch from "../../../hooks/APIsFunctions/useFetch";
// import DashboardItemSchema from "../../../Schemas/DashboardItemSchema/DashboardItemSchema.json";
// import { GetProjectUrl, SetReoute } from "../../../request";
// import { LanguageContext } from "../../../context/Language";
// import { GetActionsFromSchema } from "../../../hooks/DashboardAPIs/GetActionsFromSchema";
// import { onApply } from "../../DynamicPopup/OnApplay";
import { LanguageContext } from "../../contexts/Language";
import useFetch from "../hooks/APIsFunctions/useFetch";
import { GetActionsFromSchema } from "../hooks/DashboardAPIs/GetActionsFromSchema";
import { onApply } from "../forms/DynamicPopup/OnApplay";
import FormContainer from "../forms/DynamicPopup/FormContainer";
import { browserActionsStyle } from "./InputActions/styles";
import SelectParameter from "./SelectParameter";

function AddingLookupParameter({ ...props }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newValues, setNewValues] = useState({});
  const { localization } = useContext(LanguageContext);
  const {
    value,
    enable,
    title,
    fieldName,
    type,
    lookupReturnField,
    lookupDisplayField,
  } = props;
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const { data: schema, isLoading } = useFetch(
    `/Dashboard/GetDashboardFormSchemaBySchemaID?DashboardFormSchemaID=${props.lookupID}`
  );

  if (isLoading || !schema) {
    return null;
  }
  console.log("====================================");
  console.log(newValues, modalOpen);
  console.log("====================================");

  return (
    <div className="flex">
      <SelectParameter
        value={newValues}
        {...props}
        returnField={
          newValues[lookupReturnField] || props.value[lookupReturnField]
        }
        displayField={
          newValues[lookupDisplayField] ||
          props.value[lookupDisplayField] ||
          newValues.partitionNumber
        }
        enable={false}
      />
      <Button className="mx-2 p-4" onClick={toggleModal}>
        +
      </Button>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalContent
          schema={schema}
          toggleModal={toggleModal}
          localization={localization}
          fieldName={fieldName}
          newValues={newValues}
          setNewValues={setNewValues}
          setModalOpen={setModalOpen}
        />
      </Modal>
    </div>
  );
}

const ModalContent = ({
  schema,
  toggleModal,
  localization,
  fieldName,
  setNewValues,
  setModalOpen,
}) => {
  const [result, setResult] = useState({});
  const [disable, setDisable] = useState(false);
  const { getAction, postAction, putAction, deleteAction, error } =
    GetActionsFromSchema(schema);

  const sendRequest = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log("Form Data:", formJson, postAction);
    setDisable(true);
    try {
      const request = await onApply(
        formJson,
        null,
        true,
        postAction,
        schema.projectProxyRoute
      );
      if (request.success === true) {
        console.log("====================================");
        console.log("enter");
        console.log("====================================");
        setNewValues(request.data);
        setModalOpen(false);
        // toggleModal();
        // setDisplayThankyou(true);
      } else {
        setResult(request);
      }
    } catch (error) {
      console.error("API call failed:", error);
      // Optionally, handle the error here (e.g., show a notification)
    } finally {
      // Enable the button after the API call
      setDisable(false);
    }
  };
  if (error) {
    console.error("Error fetching actions from schema:", error);
    return <p>{localization.errors.schemaLoadFailed}</p>;
  }

  return (
    <form onSubmit={sendRequest}>
      <ModalHeader id="form-dialog-title" className="text-black">
        {schema.dashboardFormSchemaInfoDTOView.addingHeader}
      </ModalHeader>
      <ReactstrapModalBody>
        <FormContainer
          tableSchema={schema}
          row={{}}
          returnRow={() => {}}
          errorResult={result}
        />
      </ReactstrapModalBody>
      <ModalFooter>
        <Button
          className={browserActionsStyle.modalButton}
          onClick={toggleModal}
        >
          {localization.browser.modal.button.cancel}
        </Button>
        <Button
          className={browserActionsStyle.modalFooterButton}
          name={fieldName}
          disabled={disable}
          type="submit"
        >
          {localization.popup.submitButton}
        </Button>
      </ModalFooter>
    </form>
  );
};

export default AddingLookupParameter;
