import { useContext, useEffect, useState } from "react";
import CollapsibleSection from "../../utils/components/CollapsibleSection";
import FormContainer from "../forms/DynamicPopup/FormContainer";
import LocationMap from "./LocationMap";
import { LanguageContext } from "../../contexts/Language";
import { panelActionsStyle } from "../forms/PartingFrom/styles";
import { Button } from "reactstrap";
import { FaDrawPolygon } from "react-icons/fa";
import { GetActionsFromSchema } from "../hooks/DashboardAPIs/GetActionsFromSchema";
import { onApply } from "../forms/DynamicPopup/OnApplay";
function LocationMapParameter({ ...props }) {
  const [location, setLocation] = useState(props.value);
  const [clickAction, setClickAction] = useState("pin");
  const [newPolygon, setNewPolygon] = useState([]);
  const { localization } = useContext(LanguageContext);
  const [result, setResult] = useState({});
  const [disable, setDisable] = useState(false);
  const findServerContainer = props.subSchemas?.find(
    (schema) => schema.schemaType === "ServerPolygonContainer",
  );
  // const subSchema = subSchemas?.find(
  //   (s) => s.dashboardFormSchemaID === location.lookupID,
  // );
  useEffect(() => {
    if (navigator.geolocation && !props.value) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };
  const GetSchemaCollapsable = () => {
    if (findServerContainer && clickAction === "polygon") {
      return findServerContainer;
    } else {
      return {
        dashboardFormSchemaParameters: props.formSchemaParameters
          .filter(
            (i) =>
              i.parameterType.startsWith("areaMap") ||
              i.parameterType.startsWith("map"),
          )
          .map((param) => {
            return {
              ...param,
              parameterType: "text",
              isEnable: false,
            };
          }),
      };
    }
  };
  const { getAction, postAction, putAction, deleteAction, error } =
    GetActionsFromSchema(findServerContainer);

  const addNewPolygon = async (e) => {
    // 1. Stop the default browser submission immediately
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    setDisable(true);
    try {
      const request = await onApply(
        formJson,
        null,
        true,
        postAction,
        findServerContainer.projectProxyRoute,
      );
      if (request.success === true) {
        console.log("Success:", request);
      } else {
        setResult(request);
      }
    } catch (error) {
      console.error("API call failed:", error);
    } finally {
      setDisable(false);
    }
  };
  return (
    <div>
      <LocationMap
        location={location}
        onLocationChange={handleLocationChange}
        clickable={true}
        fields={props.formSchemaParameters}
        haveRadius={props.type === "areaMapLongitudePoint"}
        subSchemas={props.subSchemas}
        findServerContainer={findServerContainer}
        clickAction={clickAction}
        setClickAction={setClickAction}
        setNewPolygon={setNewPolygon}
      />
      {findServerContainer &&
        clickAction === "polygon" &&
        props.formSchemaParameters
          .filter(
            (i) =>
              i.parameterType.startsWith("areaMap") ||
              i.parameterType.startsWith("map"),
          )
          .map((pram) => (
            <input
              type="hidden"
              name={pram.parameterField}
              value={location[pram.parameterField]}
            />
          ))}

      <div className="mt-6 pt-3">
        <form onSubmit={addNewPolygon} action="">
          <CollapsibleSection title={localization.inputs.locationMap.mapInputs}>
            <FormContainer
              errorResult={{}}
              key={JSON.stringify({ ...location, ...newPolygon })}
              returnRow={() => {}}
              row={{ ...location, ...newPolygon }}
              tableSchema={GetSchemaCollapsable()}
            />
            {findServerContainer && clickAction === "polygon" && (
              <div className={panelActionsStyle.containerWithButton}>
                <div className={panelActionsStyle.buttonContainer}>
                  <Button
                    type="submit"
                    disabled={disable}
                    className="pop flex items-center gap-2"
                  >
                    <FaDrawPolygon size={18} />
                    {localization.fileContainer.textButtonUploadValue}
                  </Button>
                </div>
              </div>
            )}
          </CollapsibleSection>
        </form>
      </div>
    </div>
  );
}
export default LocationMapParameter;
