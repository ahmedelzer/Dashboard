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
import PolygonForm from "../forms/Polygon/PolygonForm";
// Fix for Leaflet marker icons not showing correctly
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const LocationMap = ({
  location,
  onLocationChange = () => {},
  clickable,
  fields,
  haveRadius,
  findServerContainer,
  clickAction = "pin",
  setClickAction = () => {},
  setNewPolygon = () => {},
}) => {
  const { localization } = useContext(LanguageContext);

  const latitudeField = fields.find(
    (param) =>
      param.parameterType ===
      (haveRadius ? "areaMapLatitudePoint" : "mapLatitudePoint"),
  )?.parameterField;

  const longitudeField = fields.find(
    (param) =>
      param.parameterType ===
      (haveRadius ? "areaMapLongitudePoint" : "mapLongitudePoint"),
  )?.parameterField;

  const radiusField = haveRadius
    ? fields.find((param) => param.parameterType === "areaMapRadius")
        ?.parameterField
    : null;

  const [radius, setRadius] = useState(location[radiusField] || 100);

  const lat = +location[latitudeField] || 20; // Default latitude
  const lng = +location[longitudeField] || 24; // Default longitude

  const MapClickHandler = () => {
    useMapEvents({
      async click(e) {
        const { lat, lng } = e.latlng;
        // const response = await fetch(
        //   `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        // );

        // const data = await response.json();

        // const isoCode = data?.address?.country_code?.toUpperCase(); // EG
        // const city =
        //   data?.address?.city ||
        //   data?.address?.town ||
        //   data?.address?.village ||
        //   data?.address?.state;
        onLocationChange({
          [latitudeField]: lat,
          [longitudeField]: lng,
          ...(radiusField && { [radiusField]: radius }),
        });
      },
    });
    return null;
  };

  const handleRadiusChange = (e) => {
    setRadius(Number(e.target.value));
  };

  useEffect(() => {
    if (radiusField) {
      onLocationChange({
        [latitudeField]: lat,
        [longitudeField]: lng,
        [radiusField]: radius,
      });
    }
  }, []);
  useEffect(() => {
    if (lng && lat) {
      onLocationChange({
        [latitudeField]: lat,
        [longitudeField]: lng,
        // [radiusField]: radius,
      });
    }
  }, []);
  return (
    <div className={locationMap.container}>
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        className={locationMap.mapContainer}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {clickable && clickAction === "pin" && <MapClickHandler />}
        <PolygonForm
          schema={findServerContainer}
          enable={clickAction === "polygon"}
          setNewPolygon={setNewPolygon}
        />
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
      {clickable && findServerContainer && (
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={() => setClickAction("pin")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              clickAction === "pin" ? "bg-accent text-bg" : "bg-bg text-text"
            }`}
          >
            {localization.inputs.locationMap.pinTap}
          </button>

          <button
            type="button"
            onClick={() => setClickAction("polygon")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              clickAction === "polygon"
                ? "bg-accent text-bg"
                : "bg-bg text-text"
            }`}
          >
            {localization.inputs.locationMap.polygonTap}
          </button>
        </div>
      )}
      {radiusField && clickable && haveRadius && (
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
