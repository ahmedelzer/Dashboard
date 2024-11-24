import React, { useContext, useEffect, useState } from "react";
import LocationMap from "./LocationMap";
import { LanguageContext } from "../../contexts/Language";
function LocationMapParameter({ ...props }) {
  const [location, setLocation] = useState(props.value);
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
  return (
    <div>
      <LocationMap
        location={location}
        onLocationChange={handleLocationChange}
        clickable={true}
        fields={props.formSchemaParameters}
        haveRadius={props.type === "areaMapLongitudePoint"}
      />
      {props.formSchemaParameters
        .filter(
          (i) =>
            i.parameterType.startsWith("areaMap") ||
            i.parameterType.startsWith("map")
        )
        .map((pram) => (
          <input
            type="hidden"
            name={pram.parameterField}
            value={location[pram.parameterField]}
          />
        ))}
    </div>
  );
}
export default LocationMapParameter;
