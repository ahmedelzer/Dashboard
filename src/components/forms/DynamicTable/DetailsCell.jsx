// // components/tables/CustomCells.js

// import { Table } from "@devexpress/dx-react-grid-bootstrap4";
// import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
// import Switch from "devextreme-react/switch";
// import React, { useContext, useEffect, useState } from "react";
// import { TbListDetails } from "react-icons/tb";
// import { Modal, ModalBody } from "reactstrap";
// import { GetIconByName } from "../../../utils/GetIconByName";
// import LocationMap from "../../inputs/LocationMap";
// import firstColsFound from "../DynamicPopup/firstColsFound.json";
// import { detailsButtonStyle } from "./styles";
// import { LanguageContext } from "../../../contexts/Language";
// import StarsIcons from "../../../utils/StarsIcons";
// import APIHandling from "../../hooks/APIsFunctions/APIHandling";
// import { useConfirmAction } from "../../hooks/customHooks/useConfirmAction";
// import { IframeParameter, PolygonMapParameter } from "../../inputs";
// import DisplayIframe from "../../../utils/components/DisplayIframe";

// export const DetailsButton = ({ row, fieldName, title, onClick }) => {
//   return (
//     <div>
//       <button
//         className={detailsButtonStyle.button}
//         onClick={() => onClick(row, fieldName, title)}
//       >
//         <TbListDetails size={18} />
//       </button>
//     </div>
//   );
// };
// export const CustomSwitchButton = ({
//   isOn = false,
//   loading,
//   onChange = () => {},
//   fieldAction,
// }) => {
//   const toggleSwitch = async () => {
//     const newValue = !isOn;

//     await onChange(newValue);
//     // setIsOn(newValue);
//   };

//   return (
//     <button
//       disabled={!fieldAction || loading}
//       onClick={toggleSwitch}
//       style={{
//         direction: "ltr",
//         backgroundColor: isOn ? "green" : "red",
//         color: "white",
//         padding: "8px 16px",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//         minWidth: "60px",
//         transition: "0.3s",
//       }}
//     >
//       {isOn ? "ON" : "OFF"}
//     </button>
//   );
// };

// export default CustomSwitchButton;

// // export const ToggleSwitchComponent = ({ onChangeAction }: { onChangeAction: (newState: boolean) => void },fieldAction) => {
// //   const [isOn, setIsOn] = useState(false); // Initialize state to false

// //   const handleSwitchChange = (e: { value: boolean }) => {
// //     setIsOn(e.value);  // Update state based on switch value
// //     onChangeAction(e.value);  // Call the passed in handler with the new value
// //   };

// //   return (
// //     <Switch
// //       disabled={!fieldAction}
// //         value={isOn}
// //         onValueChanged={(e)=>handleSwitchChange} // Handles toggling the switch
// //         style={{ direction: "ltr" }}
// //       />
// //   );
// // };

// export const DetailsCell = ({
//   props,
//   subSchemas,
//   setSubSchema,
//   setFieldName,
//   setTitle,
//   toggleRowExpanded,
//   schema,
//   specialActions,
// }) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalOpenPolygen, setModalOpenPolygen] = useState(false);

//   const column = props.column;
//   const [isOn, setIsOn] = useState(props.row[column.name]);
//   const { localization } = useContext(LanguageContext);
//   const { confirmAndRun, ConfirmModal } = useConfirmAction();
//   const [loading, setLoading] = useState(false);
//   if (column.type === "detailsCell") {
//     const findSubSchemas = subSchemas?.find(
//       (schema) => schema.dashboardFormSchemaID === column.lookupID,
//     );
//     setSubSchema(findSubSchemas);

//     return (
//       <Table.Cell {...props}>
//         <DetailsButton
//           row={props.row}
//           fieldName={column.name}
//           title={column.title}
//           onClick={(row, field, title) => {
//             setFieldName(field);
//             setTitle(title);
//             toggleRowExpanded(row);
//           }}
//         />
//       </Table.Cell>
//     );
//   } else if (column.name === "switchAction" || column.type === "boolean") {
//     const fieldAction = specialActions.find(
//       (item) =>
//         item.dashboardFormActionMethodType.split(":")[1] === column.name,
//     );
//     const sendRequest = async (newValue) => {
//       try {
//         setLoading(true);
//         const response = await APIHandling(
//           `${fieldAction.routeAdderss}/${props.row[schema.idField]}`,
//           fieldAction.dashboardFormActionMethodType?.split(":")[0],
//           newValue,
//         );
//         if (response.success) {
//           setIsOn(newValue);
//         }
//         console.log("Switch changed for", schema.idField);
//         // Optionally handle response: toast, reload, etc.
//       } catch (error) {
//         console.error("Failed to update value", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     return (
//       <>
//         <Table.Cell {...props}>
//           <CustomSwitchButton
//             isOn={isOn || props.row[column.name]}
//             fieldAction={fieldAction}
//             loading={loading}
//             onChange={(newValue) =>
//               confirmAndRun(fieldAction, () => sendRequest(newValue))
//             }
//           />
//         </Table.Cell>
//         {ConfirmModal}
//       </>
//     );
//   } else if (
//     column.type === "areaMapLongitudePoint" ||
//     column.type === "mapLongitudePoint"
//   ) {
//     const toggleModal = () => {
//       setModalOpen(!modalOpen);
//     };

//     return (
//       <Table.Cell {...props}>
//         <Modal isOpen={modalOpen} toggle={toggleModal}>
//           <ModalBody>
//             <LocationMap
//               location={props.row}
//               fields={schema?.dashboardFormSchemaParameters}
//               clickable={false}
//             />
//           </ModalBody>
//         </Modal>
//         <button className={detailsButtonStyle.button} onClick={toggleModal}>
//           {localization.table.areaColumnTitle}
//         </button>
//       </Table.Cell>
//     );
//   } else if (firstColsFound.includes(props.column.type)) {
//     // TODO:here make the popup of rate
//     const value = parseFloat(props.row[props.column.name]) || 0;
//     return (
//       <Table.Cell {...props}>
//         <div className="flex items-center">
//           <p className="m-0 text-md !mx-1 !p-0">{value}</p>
//           {props.column.type === "rate" ? (
//             <StarsIcons value={value} />
//           ) : (
//             <div className="text-accent">
//               {GetIconByName(props.column.type, 22)}
//             </div>
//           )}
//         </div>
//       </Table.Cell>
//     );
//   } else if (column.type === "flag") {
//     //const flag = props.column.isWithFlag;
//     const colorFlag = () => {
//       switch (props.row[props.column.name]) {
//         case 0:
//           return "black";
//         case -1:
//           return "rgb(250 204 21)";
//         case -2:
//           return `rgb(185 28 28 )`;
//         case 1:
//           return "rgb(74 222 128 )";
//         default:
//           return "black";
//       }
//     };
//     return (
//       <Table.Cell {...props}>
//         <button
//           disabled={true}
//           // onClick={toggleSwitch}
//           style={{
//             direction: "ltr",
//             backgroundColor: colorFlag(),
//             color: "white",
//             padding: "8px 16px",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             minWidth: "60px",
//             transition: "0.3s",
//           }}
//         >
//           {/* {isOn ? "ON" : "OFF"} */}
//         </button>
//       </Table.Cell>
//     );
//   } else if (column.type === "drawPolygon") {
//     const toggleModal = () => {
//       setModalOpen(!modalOpen);
//     };
//     const initvalue = JSON.stringify([
//       {
//         lat: 30.06344854241132,
//         lng: 31.48146056919359,
//       },
//       {
//         lat: 30.06344854241132,
//         lng: 31.483520505717028,
//       },
//       {
//         lat: 30.06344854241132,
//         lng: 31.485580442240465,
//       },
//       {
//         lat: 30.06344854241132,
//         lng: 31.48970031528734,
//       },
//       {
//         lat: 30.06344854241132,
//         lng: 31.491760251810778,
//       },
//       {
//         lat: 30.063151406016434,
//         lng: 31.493476865580313,
//       },
//       {
//         lat: 30.06285426872962,
//         lng: 31.494850156595934,
//       },
//       {
//         lat: 30.06285426872962,
//         lng: 31.49691009311937,
//       },
//       {
//         lat: 30.062557130550875,
//         lng: 31.49794006138109,
//       },
//       {
//         lat: 30.061665710663068,
//         lng: 31.49965667515062,
//       },
//       {
//         lat: 30.061665710663068,
//         lng: 31.50068664341234,
//       },
//       {
//         lat: 30.061665710663068,
//         lng: 31.50171661167406,
//       },
//       {
//         lat: 30.061071426278293,
//         lng: 31.502746579935778,
//       },
//       {
//         lat: 30.060774282748074,
//         lng: 31.503089902689684,
//       },
//       {
//         lat: 30.060477138325954,
//         lng: 31.503776548197497,
//       },
//       {
//         lat: 30.060179993011925,
//         lng: 31.504463193705313,
//       },
//       {
//         lat: 30.059882846806023,
//         lng: 31.504806516459215,
//       },
//       {
//         lat: 30.05958569970824,
//         lng: 31.504806516459215,
//       },
//       {
//         lat: 30.059288551718577,
//         lng: 31.505493161967028,
//       },
//       {
//         lat: 30.058694253063646,
//         lng: 31.505836484720934,
//       },
//       {
//         lat: 30.057505645051574,
//         lng: 31.506866452982653,
//       },
//       {
//         lat: 30.056614179678192,
//         lng: 31.50720977573656,
//       },
//       {
//         lat: 30.055128386219575,
//         lng: 31.507553098490465,
//       },
//       {
//         lat: 30.053642570466106,
//         lng: 31.508239743998278,
//       },
//       {
//         lat: 30.052156732418428,
//         lng: 31.508239743998278,
//       },
//       {
//         lat: 30.049779345171917,
//         lng: 31.508583066752184,
//       },
//       {
//         lat: 30.04859063014771,
//         lng: 31.508583066752184,
//       },
//       {
//         lat: 30.047104716304794,
//         lng: 31.508583066752184,
//       },
//       {
//         lat: 30.046213157299167,
//         lng: 31.508583066752184,
//       },
//       {
//         lat: 30.045024399475512,
//         lng: 31.50789642124437,
//       },
//       {
//         lat: 30.043835627386027,
//         lng: 31.507553098490465,
//       },
//       {
//         lat: 30.042646841031065,
//         lng: 31.50720977573656,
//       },
//       {
//         lat: 30.04116083802707,
//         lng: 31.506866452982653,
//       },
//       {
//         lat: 30.040269225526092,
//         lng: 31.50617980747484,
//       },
//       {
//         lat: 30.038783186860652,
//         lng: 31.505836484720934,
//       },
//       {
//         lat: 30.03789155296332,
//         lng: 31.504806516459215,
//       },
//       {
//         lat: 30.0367026952861,
//         lng: 31.504463193705313,
//       },
//       {
//         lat: 30.035811042667792,
//         lng: 31.503776548197497,
//       },
//       {
//         lat: 30.034919382026473,
//         lng: 31.503089902689684,
//       },
//       {
//         lat: 30.034324937141722,
//         lng: 31.503089902689684,
//       },
//       {
//         lat: 30.033730488691315,
//         lng: 31.50240325718187,
//       },
//       {
//         lat: 30.033136036675252,
//         lng: 31.50171661167406,
//       },
//       {
//         lat: 30.032838809330144,
//         lng: 31.50171661167406,
//       },
//       {
//         lat: 30.032541581093586,
//         lng: 31.501373288920153,
//       },
//       {
//         lat: 30.032244351965684,
//         lng: 31.501029966166247,
//       },
//       {
//         lat: 30.031947121946388,
//         lng: 31.50068664341234,
//       },
//       {
//         lat: 30.031947121946388,
//         lng: 31.500343320658434,
//       },
//       {
//         lat: 30.0316498910357,
//         lng: 31.500343320658434,
//       },
//       {
//         lat: 30.031352659233637,
//         lng: 31.500343320658434,
//       },
//       {
//         lat: 30.03105542654023,
//         lng: 31.49965667515062,
//       },
//       {
//         lat: 30.03075819295543,
//         lng: 31.498970029642813,
//       },
//       {
//         lat: 30.03075819295543,
//         lng: 31.49794006138109,
//       },
//       {
//         lat: 30.03046095847929,
//         lng: 31.49691009311937,
//       },
//       {
//         lat: 30.029569249702767,
//         lng: 31.495536802103747,
//       },
//       {
//         lat: 30.029569249702767,
//         lng: 31.493133542826403,
//       },
//       {
//         lat: 30.029569249702767,
//         lng: 31.491073606302965,
//       },
//       {
//         lat: 30.029569249702767,
//         lng: 31.48832702427172,
//       },
//       {
//         lat: 30.029569249702767,
//         lng: 31.485580442240465,
//       },
//       {
//         lat: 30.029569249702767,
//         lng: 31.483863828470934,
//       },
//       {
//         lat: 30.029569249702767,
//         lng: 31.48146056919359,
//       },
//       {
//         lat: 30.029569249702767,
//         lng: 31.47974395542406,
//       },
//       {
//         lat: 30.0301637231118,
//         lng: 31.47802734165453,
//       },
//       {
//         lat: 30.03075819295543,
//         lng: 31.47699737339281,
//       },
//       {
//         lat: 30.03075819295543,
//         lng: 31.475624082377184,
//       },
//       {
//         lat: 30.03105542654023,
//         lng: 31.47425079136156,
//       },
//       {
//         lat: 30.0316498910357,
//         lng: 31.47322082309984,
//       },
//       {
//         lat: 30.031947121946388,
//         lng: 31.472190854838125,
//       },
//       {
//         lat: 30.032244351965684,
//         lng: 31.47150420933031,
//       },
//       {
//         lat: 30.032838809330144,
//         lng: 31.470130918314684,
//       },
//       {
//         lat: 30.033136036675252,
//         lng: 31.46944427280687,
//       },
//       {
//         lat: 30.033730488691315,
//         lng: 31.46875762729906,
//       },
//       {
//         lat: 30.034324937141722,
//         lng: 31.468414304545153,
//       },
//       {
//         lat: 30.03521660313169,
//         lng: 31.46704101352953,
//       },
//       {
//         lat: 30.035811042667792,
//         lng: 31.466354368021715,
//       },
//       {
//         lat: 30.0367026952861,
//         lng: 31.465667722513903,
//       },
//       {
//         lat: 30.03789155296332,
//         lng: 31.464637754252184,
//       },
//       {
//         lat: 30.0381887651539,
//         lng: 31.46395110874437,
//       },
//       {
//         lat: 30.038783186860652,
//         lng: 31.46326446323656,
//       },
//       {
//         lat: 30.039080396376743,
//         lng: 31.462921140482653,
//       },
//       {
//         lat: 30.03967481273444,
//         lng: 31.46223449497484,
//       },
//       {
//         lat: 30.040269225526092,
//         lng: 31.461891172220938,
//       },
//       {
//         lat: 30.0405664305846,
//         lng: 31.46120452671312,
//       },
//       {
//         lat: 30.041458040410962,
//         lng: 31.46051788120531,
//       },
//       {
//         lat: 30.04234964221339,
//         lng: 31.459831235697497,
//       },
//       {
//         lat: 30.042646841031065,
//         lng: 31.459144590189684,
//       },
//       {
//         lat: 30.043538432134646,
//         lng: 31.458801267435778,
//       },
//       {
//         lat: 30.043835627386027,
//         lng: 31.458114621927965,
//       },
//       {
//         lat: 30.044430015213965,
//         lng: 31.45777129917406,
//       },
//       {
//         lat: 30.045024399475512,
//         lng: 31.457427976420153,
//       },
//       {
//         lat: 30.045024399475512,
//         lng: 31.457084653666247,
//       },
//       {
//         lat: 30.045024399475512,
//         lng: 31.456741330912344,
//       },
//       {
//         lat: 30.04532159026885,
//         lng: 31.456741330912344,
//       },
//       {
//         lat: 30.04561878017059,
//         lng: 31.456741330912344,
//       },
//       {
//         lat: 30.0459159691807,
//         lng: 31.456741330912344,
//       },
//       {
//         lat: 30.06344854241132,
//         lng: 31.48146056919359,
//       },
//     ]);
//     return (
//       <Table.Cell {...props}>
//         <Modal isOpen={modalOpen} toggle={toggleModal}>
//           <ModalBody>
//             <PolygonMapParameter
//               enable={false}
//               value={initvalue || props.row[column.name]}
//               fields={schema?.dashboardFormSchemaParameters}
//             />
//           </ModalBody>
//         </Modal>
//         <button className={detailsButtonStyle.button} onClick={toggleModal}>
//           {localization.table.areaColumnTitle}
//         </button>
//       </Table.Cell>
//     );
//   } else if (column.type === "linkView") {
//     const url = props.row[column.name];
//     return (
//       <Table.Cell {...props}>
//         <DisplayIframe url={url} />
//       </Table.Cell>
//     );
//   }

//   return <Table.Cell {...props} />;
// };

// components/tables/CustomCells.js

import React, { useContext, useState } from "react";
import { Table } from "@devexpress/dx-react-grid-bootstrap4";
import Switch from "devextreme-react/switch";
import { Modal, ModalBody } from "reactstrap";
import { TbListDetails } from "react-icons/tb";

import { LanguageContext } from "../../../contexts/Language";
import { detailsButtonStyle } from "./styles";
import { GetIconByName } from "../../../utils/GetIconByName";
import StarsIcons from "../../../utils/StarsIcons";
import APIHandling from "../../hooks/APIsFunctions/APIHandling";
import { useConfirmAction } from "../../hooks/customHooks/useConfirmAction";

import LocationMap from "../../inputs/LocationMap";
import { PolygonMapParameter } from "../../inputs";
import firstColsFound from "../DynamicPopup/firstColsFound.json";
import TypeFile from "../PartingFrom/TypeFile";
import {
  defaultProjectProxyRouteWithoutBaseURL,
  publicImageURL,
} from "../../../request";
import DisplayIframe from "../../../utils/components/DisplayIframe";
import WebsiteIcon from "../../../utils/components/WebsiteIcon";
import PolygonForm from "../Polygon/PolygonForm";
import { fetchData } from "../../hooks/APIsFunctions/useFetch";
import GetSchemaUrl from "../../hooks/DashboardAPIs/GetSchemaUrl";

/* -------------------------------------------------------------------------- */
/*                              Small UI Parts                                 */
/* -------------------------------------------------------------------------- */
const lookupMap = new Map();

const DetailsButton = ({ onClick }) => (
  <button className={detailsButtonStyle.button} onClick={onClick}>
    <TbListDetails size={18} />
  </button>
);

const FlagView = ({ value }) => {
  const colors = {
    0: "black",
    "-1": "rgb(250 204 21)",
    "-2": "rgb(185 28 28)",
    1: "rgb(74 222 128)",
  };

  return (
    <button
      disabled
      style={{
        backgroundColor: colors[value] ?? "black",
        padding: "8px 16px",
        borderRadius: "5px",
        minWidth: "60px",
      }}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*                              Switch Cell                                    */
/* -------------------------------------------------------------------------- */

const BooleanCell = ({ row, column, schema, specialActions }) => {
  const [loading, setLoading] = useState(false);
  const [isOn, setIsOn] = useState(row[column.name]);
  const { confirmAndRun, ConfirmModal } = useConfirmAction();

  const action = specialActions?.find(
    (a) => a.dashboardFormActionMethodType.split(":")[1] === column.name,
  );

  const updateValue = async (newValue) => {
    setLoading(true);
    try {
      const res = await APIHandling(
        `${action.routeAdderss}/${row[schema.idField]}`,
        action.dashboardFormActionMethodType.split(":")[0],
        newValue,
      );
      if (res?.success) setIsOn(newValue);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        disabled={!action || loading}
        onClick={() => confirmAndRun(action, () => updateValue(!isOn))}
        style={{
          backgroundColor: isOn ? "green" : "red",
          color: "white",
          padding: "8px 16px",
          borderRadius: "5px",
        }}
      >
        {isOn ? "ON" : "OFF"}
      </button>
      {ConfirmModal}
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                              Map Cells                                      */
/* -------------------------------------------------------------------------- */

const MapModalCell = ({ children, label }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal isOpen={open} toggle={() => setOpen(!open)}>
        <ModalBody>{children}</ModalBody>
      </Modal>
      <button
        className={detailsButtonStyle.button}
        onClick={() => setOpen(true)}
      >
        {label}
      </button>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                              Value + Icon                                   */
/* -------------------------------------------------------------------------- */

const IconValueCell = ({ value, type }) => (
  <div className="flex items-center">
    <p className="m-0 mx-1">{value}</p>
    {type === "rate" ? (
      <StarsIcons value={value} />
    ) : (
      <div className="text-accent">{GetIconByName(type, 22)}</div>
    )}
  </div>
);

/* -------------------------------------------------------------------------- */
/*                              MAIN CELL                                      */
/* -------------------------------------------------------------------------- */
export const DetailsCell = ({
  props,
  subSchemas,
  setFieldName,
  setTitle,
  toggleRowExpanded,
  schema,
  specialActions,
  setLookupSchema,
}) => {
  const { column, row } = props;
  const { localization } = useContext(LanguageContext);

  /* ---------------------------- Cell Resolver ---------------------------- */

  const renderCell = () => {
    switch (column.type) {
      case "detailsCell": {
        // subSchemasMap.set([column.lookupID, sub]);
        return (
          <DetailsButton
            onClick={async () => {
              setFieldName(column.name);
              setTitle(column.title);
              toggleRowExpanded(row);

              let lookup = lookupMap.get(column.lookupID);

              console.log(lookup, !lookup);

              if (!lookup) {
                const { data, error, isLoading } = await fetchData(
                  GetSchemaUrl(column.lookupID),
                  defaultProjectProxyRouteWithoutBaseURL,
                );

                // ✅ Correct way to set in Map
                lookupMap.set(column.lookupID, data);

                lookup = data;
              }

              setLookupSchema(lookup);
            }}
          />
        );
      }

      case "boolean":
      case "switchAction":
        return (
          <BooleanCell
            row={row}
            column={column}
            schema={schema}
            specialActions={specialActions}
          />
        );

      case "mapLongitudePoint":
      case "areaMapLongitudePoint":
        const findServerContainer = subSchemas.find(
          (s) => s.schemaType === "ServerPolygonContainer",
        );
        return (
          <MapModalCell label={localization.table.areaColumnTitle}>
            <LocationMap
              location={row}
              fields={schema?.dashboardFormSchemaParameters}
              clickable={false}
              findServerContainer={findServerContainer}
              haveRadius={props.type === "areaMapLongitudePoint"}
              subSchemas={subSchemas}
            />
          </MapModalCell>
        );

      case "flag":
        return <FlagView value={row[column.name]} />;
      case "linkView":
        return <DisplayIframe url={row[column.name]} />;
      case "websiteIcon":
        return <WebsiteIcon url={row[column.name]} />;
      case "publicImage":
        const value = row[column.name];
        const isBlob = typeof value === "string" && value.startsWith("blob:");
        return (
          <div style={{ width: "50px", height: "50px" }}>
            <TypeFile
              file={isBlob ? value : `${publicImageURL}/${value}`}
              title={`${column.name}-image`}
              type={"publicImage"}
            />
          </div>
        );

      default:
        if (firstColsFound.includes(column.type)) {
          const value = parseFloat(row[column.name]) || 0;
          return <IconValueCell value={value} type={column.type} />;
        }
        return null;
    }
  };

  return <Table.Cell {...props}>{renderCell()}</Table.Cell>;
};
