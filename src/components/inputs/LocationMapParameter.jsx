import React, { useContext, useEffect, useState } from "react";
import LocationMap from "./LocationMap";
import { LanguageContext } from "../../contexts/Language";
function LocationMapParameter({ ...props }) {
  const [location, setLocation] = useState(
    Object.keys(props.value).length > 0
      ? props.value
      : {
          centerLatitudePoint: 30.036271730628933,
          centerLongitudePoint: 31.26169967625174,
        }
  );
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
      />
      {props.formSchemaParameters
        .filter((i) => i.parameterType.startsWith("areaMap"))
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
