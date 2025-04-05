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
import React, { useContext, useState } from "react";
import { TbListDetails } from "react-icons/tb";
import { Modal, ModalBody } from "reactstrap";
import { GetIconByName } from "../../../utils/GetIconByName";
import LocationMap from "../../inputs/LocationMap";
import firstColsFound from "../DynamicPopup/firstColsFound.json";
import { detailsButtonStyle } from "./styles";
import { LanguageContext } from "../../../contexts/Language";

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

export const SwitchCell = ({ value, onValueChange }) => {
  return (
    <Switch
      value={value}
      onValueChanged={(e) => onValueChange(e.value)}
      style={{ direction: "ltr" }}
    />
  );
};

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
  const { localization } = useContext(LanguageContext);

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
    return (
      <Table.Cell {...props}>
        <SwitchCell
          value={props.row[column.name]}
          onValueChange={(newValue) => {
            // Add logic to trigger specialActions here if needed
            console.log("Switch changed to", newValue);
          }}
        />
      </Table.Cell>
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

    return (
      <Table.Cell {...props}>
        <div className="flex items-center">
          <p className="m-0 text-md !mx-1 !p-0">
            {props.row[props.column.type]}
          </p>
          <div className="text-accent">
            {GetIconByName(props.column.type, 22)}
          </div>
        </div>
      </Table.Cell>
    );
  }

  return <Table.Cell {...props} />;
};
