// import { Table } from "@devexpress/dx-react-grid-bootstrap4";
// import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
// import Switch from "devextreme-react/switch";
// import React, { useContext, useState } from "react";
// import { TbListDetails } from "react-icons/tb";
// import { Modal, ModalBody } from "reactstrap";
// import { GetIconByName } from "../../../utils/GetIconByName";
// import LocationMap from "../../inputs/LocationMap";
// import firstColsFound from "../DynamicPopup/firstColsFound.json";
// import { detailsButtonStyle } from "./styles";
// import { LanguageContext } from "../../../contexts/Language";
// const DetailsButton = ({
//   row,
//   fieldName,
//   title,
//   toggleRowExpanded,
//   setTitle,
//   setFieldName,
// }) => {
//   const handleClick = () => {
//     setFieldName(fieldName);
//     setTitle(title);
//     toggleRowExpanded(row);
//   };
//   return (
//     <div>
//       <button className={detailsButtonStyle.button} onClick={handleClick}>
//         <TbListDetails size={18} />
//       </button>
//     </div>
//   );
// };
// const SwitchCell = ({ value, specialActions }) => {
//   async function onValueChange(newValue) {
//     // const requst = await onApply(newValue);
//   }
//   return (
//     <Switch
//       value={value}
//       onValueChanged={(e) => onValueChange(e.value)}
//       style={{ direction: "ltr" }}
//     />
//   );
// };
// export const DetailsCell = (props) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const { localization } = useContext(LanguageContext);

//   if (props.column.type === "detailsCell") {
//     const findSubSchemas = props.subSchemas?.find(
//       (schema) => schema.dashboardFormSchemaID === props.column.lookupID
//     );
//     props.setSubSchema(findSubSchemas);
//     return (
//       <Table.Cell {...props}>
//         <DetailsButton
//           row={props.row}
//           fieldName={props.column.name}
//           title={props.column.title}
//         />
//       </Table.Cell>
//     );
//   } else if (
//     props.column.name === "switchAction" ||
//     props.column.type === "boolean"
//   ) {
//     return (
//       <Table.Cell {...props}>
//         <SwitchCell
//           value={props.row[props.column.name]}
//           specialActions={props.specialActions}
//           // onValueChange={(newValue) => {
//           //   console.log(newValue);
//           // }}
//         />
//       </Table.Cell>
//     );
//   } else if (
//     props.column.type === "areaMapLongitudePoint" ||
//     props.column.type === "mapLongitudePoint"
//   ) {
// const toggleModal = () => {
//   setModalOpen(!modalOpen);
// };
// return (
//   <Table.Cell {...props}>
//     <Modal isOpen={modalOpen} toggle={toggleModal}>
//       <ModalBody>
//         <LocationMap
//           // location={{
//           //   latitude: 30,
//           //   longitude: 22,
//           //   // radius: +props.row.radius,
//           // }}
//           location={props.row}
//           fields={props.schema?.dashboardFormSchemaParameters}
//           clickable={false}
//         />
//       </ModalBody>
//     </Modal>
//     <button className={detailsButtonStyle.button} onClick={toggleModal}>
//       {localization.table.areaColumnTitle}
//     </button>
//   </Table.Cell>
// );
// } else if (firstColsFound.includes(props.column.type)) {
//   // TODO:here make the popup of rate

//   return (
//     <Table.Cell {...props}>
//       <div className="flex items-center">
//         <p className="m-0 text-md !mx-1 !p-0">
//           {props.row[props.column.type]}
//         </p>
//         <div className="text-accent">
//           {GetIconByName(props.column.type, 22)}
//         </div>
//       </div>
//     </Table.Cell>
//   );
// }
//   return <Table.Cell {...props} />;
// };
// components/tables/CustomCells.js

import { Table } from "@devexpress/dx-react-grid-bootstrap4";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import Switch from "devextreme-react/switch";
import React, { useContext, useEffect, useState } from "react";
import { TbListDetails } from "react-icons/tb";
import { Modal, ModalBody } from "reactstrap";
import { GetIconByName } from "../../../utils/GetIconByName";
import LocationMap from "../../inputs/LocationMap";
import firstColsFound from "../DynamicPopup/firstColsFound.json";
import { detailsButtonStyle } from "./styles";
import { LanguageContext } from "../../../contexts/Language";
import StarsIcons from "../../../utils/StarsIcons";
import APIHandling from "../../hooks/APIsFunctions/APIHandling";
import { useConfirmAction } from "../../hooks/customHooks/useConfirmAction";

export const DetailsButton = ({ row, fieldName, title, onClick }) => {
  return (
    <div>
      <button
        className={detailsButtonStyle.button}
        onClick={() => onClick(row, fieldName, title)}
      >
        <TbListDetails size={18} />
      </button>
    </div>
  );
};
export const CustomSwitchButton = ({
  isOn = false,
  loading,
  onChange = () => {},
  fieldAction,
}) => {
  const toggleSwitch = async () => {
    const newValue = !isOn;

    await onChange(newValue);
    // setIsOn(newValue);
  };

  return (
    <button
      disabled={!fieldAction || loading}
      onClick={toggleSwitch}
      style={{
        direction: "ltr",
        backgroundColor: isOn ? "green" : "red",
        color: "white",
        padding: "8px 16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        minWidth: "60px",
        transition: "0.3s",
      }}
    >
      {isOn ? "ON" : "OFF"}
    </button>
  );
};

export default CustomSwitchButton;

// export const ToggleSwitchComponent = ({ onChangeAction }: { onChangeAction: (newState: boolean) => void },fieldAction) => {
//   const [isOn, setIsOn] = useState(false); // Initialize state to false

//   const handleSwitchChange = (e: { value: boolean }) => {
//     setIsOn(e.value);  // Update state based on switch value
//     onChangeAction(e.value);  // Call the passed in handler with the new value
//   };

//   return (
//     <Switch
//       disabled={!fieldAction}
//         value={isOn}
//         onValueChanged={(e)=>handleSwitchChange} // Handles toggling the switch
//         style={{ direction: "ltr" }}
//       />
//   );
// };

export const DetailsCell = ({
  props,
  subSchemas,
  setSubSchema,
  setFieldName,
  setTitle,
  toggleRowExpanded,
  schema,
  specialActions,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const column = props.column;
  const [isOn, setIsOn] = useState(props.row[column.name]);
  const { localization } = useContext(LanguageContext);
  const { confirmAndRun, ConfirmModal } = useConfirmAction();
  const [loading, setLoading] = useState(false);
  if (column.type === "detailsCell") {
    const findSubSchemas = subSchemas?.find(
      (schema) => schema.dashboardFormSchemaID === column.lookupID
    );
    setSubSchema(findSubSchemas);

    return (
      <Table.Cell {...props}>
        <DetailsButton
          row={props.row}
          fieldName={column.name}
          title={column.title}
          onClick={(row, field, title) => {
            setFieldName(field);
            setTitle(title);
            toggleRowExpanded(row);
          }}
        />
      </Table.Cell>
    );
  } else if (column.name === "switchAction" || column.type === "boolean") {
    const fieldAction = specialActions.find(
      (item) => item.dashboardFormActionMethodType.split(":")[1] === column.name
    );
    const sendRequest = async (newValue) => {
      try {
        setLoading(true);
        const response = await APIHandling(
          `${fieldAction.routeAdderss}/${props.row[schema.idField]}`,
          fieldAction.dashboardFormActionMethodType?.split(":")[0],
          newValue
        );
        if (response.success) {
          setIsOn(newValue);
        }
        console.log("Switch changed for", schema.idField);
        // Optionally handle response: toast, reload, etc.
      } catch (error) {
        console.error("Failed to update value", error);
      } finally {
        setLoading(false);
      }
    };
    return (
      <>
        <Table.Cell {...props}>
          <CustomSwitchButton
            isOn={isOn || props.row[column.name]}
            fieldAction={fieldAction}
            loading={loading}
            onChange={(newValue) =>
              confirmAndRun(fieldAction, () => sendRequest(newValue))
            }
          />
        </Table.Cell>
        {ConfirmModal}
      </>
    );
  } else if (
    column.type === "areaMapLongitudePoint" ||
    column.type === "mapLongitudePoint"
  ) {
    const toggleModal = () => {
      setModalOpen(!modalOpen);
    };

    return (
      <Table.Cell {...props}>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
          <ModalBody>
            <LocationMap
              location={props.row}
              fields={schema?.dashboardFormSchemaParameters}
              clickable={false}
            />
          </ModalBody>
        </Modal>
        <button className={detailsButtonStyle.button} onClick={toggleModal}>
          {localization.table.areaColumnTitle}
        </button>
      </Table.Cell>
    );
  } else if (firstColsFound.includes(props.column.type)) {
    // TODO:here make the popup of rate
    const value = parseFloat(props.row[props.column.name]) || 0;
    return (
      <Table.Cell {...props}>
        <div className="flex items-center">
          <p className="m-0 text-md !mx-1 !p-0">{value}</p>
          {props.column.type === "rate" ? (
            <StarsIcons value={value} />
          ) : (
            <div className="text-accent">
              {GetIconByName(props.column.type, 22)}
            </div>
          )}
        </div>
      </Table.Cell>
    );
  } else if (column.type === "flag") {
    //const flag = props.column.isWithFlag;
    const colorFlag = () => {
      switch (props.row[props.column.name]) {
        case 0:
          return "black";
        case -1:
          return "rgb(250 204 21)";
        case -2:
          return `rgb(185 28 28 )`;
        case 1:
          return "rgb(74 222 128 )";
        default:
          return "black";
      }
    };
    return (
      <Table.Cell {...props}>
        <button
          disabled={true}
          // onClick={toggleSwitch}
          style={{
            direction: "ltr",
            backgroundColor: colorFlag(),
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            minWidth: "60px",
            transition: "0.3s",
          }}
        >
          {/* {isOn ? "ON" : "OFF"} */}
        </button>
      </Table.Cell>
    );
  }

  return <Table.Cell {...props} />;
};
