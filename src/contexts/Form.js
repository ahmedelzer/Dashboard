import React, { useState, createContext } from "react";
import { GetActionsFromSchema } from "../components/hooks/DashboardAPIs/GetActionsFromSchema";
import { useSearchParams } from "react-router-dom";
//context
export const FormContext = createContext();

const Form = ({ children, schemas }) => {
  const mainSchema = schemas?.find((item) => item?.isMainSchema === true);
  const subSchemas = schemas?.filter((item) => item.isMainSchema !== true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [actionsForm, setActionsForm] = useState(null);
  const [dependenceRow, setDependenceRow] = useState({
    saleInvoiceID: "adadf1bb-2bfc-4bb4-b183-01714632830a",
    invoiceNumber: "111425556",
    node_Name: "MainNode",
    nodeLatitudePoint: 28.1074513,
    nodeLongitudePoint: 30.750378,
    costmerlocationLatitudePoint: 28.1074513,
    costmerlocationLongitudePoint: 30.750378,
    requestedDatetime: "2025-08-27T11:14:25.5569851",
    shiftID: "8a6fac55-4817-46ed-ad59-bfad0a1e9cf3",
    orderStateTypeID: "00000000-0000-0000-0000-000000000000",
    totalAmount: 20000.0,
    invoiceItemsTaxAmount: 0.0,
    invoiceTaxAmount: 0.0,
    totalTaxAmount: 0.0,
    feesAmount: 0.0,
    invoiceItemsDiscountAmount: 2000.0,
    invoiceDiscountAmount: 0.0,
    totalDiscountAmount: 2000.0,
    otherFeesAmount: 0.0,
    totalShipmentsNeeded: 0,
    totalShipmentsFeesAmount: 0.0,
    totalFeesAmount: 0.0,
    netAmount: 18000.0,
    customerName: "ahmed 3",
    customerContact: "010",
    otherCustomerContact: "",
    orderState: null,
    orderType: null,
    customerAddressLocation: "",
    saleInvoicePaymentID: "5f672faa-1f78-4155-90e8-6bbde8c26bca",
    paymentMethodID: "87174c4a-7a67-4763-9650-cb26cab3000b",
    onlionPaymentFees: 0.0,
    mainPaymentAmount: 18000.0,
    loyaltyPointsUsed: 0.0,
    accountCreditUsed: 0.0,
    payAmount: 18000.0,
    netPayAmount: 18000.0,
    nodeID: "00000000-0000-0000-0000-000000000000",
    orderTypeIndex: 0,
    orderStateIndex: 0,
    customerID: "303c1fd6-8036-4ae1-b2a0-fa08d76f4ce7",
    customerContactID: "0626d7aa-a295-4f16-b069-dc64548ab36a",
    otherCustomerContactID: null,
    note: null,
    isPaid: true,
  });

  const {
    getAction,
    postAction,
    putAction,
    searchAction,
    getDependenciesAction,
    getActionByID,
  } = GetActionsFromSchema(mainSchema);

  return (
    <FormContext.Provider
      value={{
        getAction,
        postAction,
        putAction,
        searchAction,
        getDependenciesAction,
        getActionByID,
        selectedRow,
        setSelectedRow,
        mainSchema,
        actionsForm,
        setActionsForm,
        subSchemas,
        dependenceRow,
        setDependenceRow,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default Form;
