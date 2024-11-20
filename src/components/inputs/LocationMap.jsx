import React, { useContext, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LanguageContext } from "../../contexts/Language";
import { locationMap } from "./styles";
// Fix for Leaflet marker icons not showing correctly
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const LocationMap = ({ location, onLocationChange, clickable, fields }) => {
  const { localization } = useContext(LanguageContext);

  const latitudeField = fields.find(
    (param) => param.parameterType === "areaMapLatitudePoint"
  ).parameterField;
  const longitudeField = fields.find(
    (param) => param.parameterType === "areaMapLongitudePoint"
  ).parameterField;
  const radiusField = fields.find(
    (param) => param.parameterType === "areaMapRadius"
  ).parameterField;
  const [radius, setRadius] = useState(location[radiusField] || 100); // Initial radius
  const lat = +location[latitudeField];
  const lng = +location[longitudeField];

  //const lat = 20;
  //const lng = 20;
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        onLocationChange({
          [latitudeField]: lat,
          [longitudeField]: lng,
          [radiusField]: radius,
        });
      },
    });
    return null;
  };
  const handleRadiusChange = (e) => {
    setRadius(Number(e.target.value));
  };
  // Effect to update location whenever radius changes
  useEffect(() => {
    onLocationChange({
      [latitudeField]: lat,
      [longitudeField]: lng,
      [radiusField]: radius,
    });
  }, [radius]);
  return (
    <div className={locationMap.container}>
      {/* Map with position: relative for layering controls on top */}
      <MapContainer
        center={location ? [lat, lng] : [30.032957707631663, 31.2599301782983]}
        zoom={13}
        className={locationMap.mapContainer}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {clickable && <MapClickHandler />}
        {location && (
          <>
            <Marker position={[lat, lng]}>
              <Popup>{localization.inputs.locationMap.popupTitle}</Popup>
            </Marker>
            {radiusField && (
              <Circle
                center={[lat, lng]}
                radius={radius}
                color="var(--main-color2)"
                fillColor="var(--main-color2)"
                fillOpacity={0.2}
              />
            )}
          </>
        )}
      </MapContainer>

      {/* Overlay the slider at the top of the map */}
      {/* Button at the bottom of the map, taking full width */}

      {radiusField && clickable && (
        <div className={locationMap.radiusContainer}>
          <label>
            {localization.inputs.locationMap.radius.replace("{radius}", radius)}
            <input
              type="range"
              min="50"
              max="1000"
              step="20"
              value={radius}
              onChange={handleRadiusChange}
              className={locationMap.radiusInput}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
