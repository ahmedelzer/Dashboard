import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Polygon,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
const DRAW_THRESHOLD = 0.00005;

/* =========================
   🔒 MAP LOCK / UNLOCK
========================= */
function setMapInteraction(map, enabled) {
  if (!map) return;

  const action = enabled ? "enable" : "disable";

  map.dragging[action]();
  map.scrollWheelZoom[action]();
  map.doubleClickZoom[action]();
  map.boxZoom[action]();
  map.keyboard[action]();
  map.touchZoom[action]();

  if (map.tap) map.tap[action]();
}

/* =========================
   ✍️ DRAW HANDLER
========================= */
function DrawHandler({
  isDrawing,
  setIsDrawing,
  livePath,
  setLivePath,
  setFinalPolygon,
}) {
  const map = useMap();
  const pathRef = useRef([]);

  useMapEvents({
    mousedown(e) {
      setIsDrawing(true);
      pathRef.current = [e.latlng];
      setLivePath([e.latlng]);
      setMapInteraction(map, false);
    },

    mousemove(e) {
      if (!isDrawing) return;

      const last = pathRef.current[pathRef.current.length - 1];
      const distance =
        Math.abs(last.lat - e.latlng.lat) + Math.abs(last.lng - e.latlng.lng);

      if (distance < DRAW_THRESHOLD) return;

      pathRef.current.push(e.latlng);
      setLivePath([...pathRef.current]);
    },

    mouseup() {
      if (!isDrawing) return;

      setIsDrawing(false);

      if (pathRef.current.length > 2) {
        setFinalPolygon([...pathRef.current, pathRef.current[0]]);
      }

      setLivePath([]);
      setMapInteraction(map, true);
    },

    touchstart(e) {
      this.fire("mousedown", e);
    },
    touchmove(e) {
      this.fire("mousemove", e);
    },
    touchend() {
      this.fire("mouseup");
    },
  });

  return null;
}

/* =========================
   🧩 MAIN PARAMETER COMPONENT
========================= */
export default function PolygonMapParameter({
  value,
  fieldName,
  title,
  enable = true,
  className,
}) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [livePath, setLivePath] = useState([]);
  const [finalPolygon, setFinalPolygon] = useState(
    value ? JSON.parse(value) : []
  );

  /* 🔁 Sync incoming value (edit mode) */
  useEffect(() => {
    if (value) {
      try {
        setFinalPolygon(JSON.parse(value));
      } catch {}
    }
  }, [value]);

  /* 🧾 Serialize polygon for form submit */
  const serializedValue =
    finalPolygon.length > 2 ? JSON.stringify(finalPolygon) : "";

  return (
    <div className={className}>
      {title && <label>{title}</label>}

      {/* ✅ HIDDEN FORM FIELD */}
      <input type="hidden" name={fieldName} value={serializedValue} readOnly />

      <MapContainer
        center={[30.05, 31.45]}
        zoom={12}
        style={{ height: "400px", width: "100%" }}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {enable && (
          <DrawHandler
            isDrawing={isDrawing}
            setIsDrawing={setIsDrawing}
            livePath={livePath}
            setLivePath={setLivePath}
            setFinalPolygon={setFinalPolygon}
          />
        )}

        {/* LIVE LINE */}
        {isDrawing && livePath.length > 1 && (
          <Polyline
            positions={livePath}
            pathOptions={{ color: "red", weight: 3 }}
          />
        )}

        {/* LIVE POLYGON */}
        {isDrawing && livePath.length > 2 && (
          <Polygon
            positions={livePath}
            pathOptions={{ color: "red", fillOpacity: 0.1 }}
          />
        )}

        {/* FINAL POLYGON */}
        {finalPolygon.length > 2 && (
          <Polygon
            positions={finalPolygon}
            pathOptions={{ color: "#1E88E5", fillOpacity: 0.25 }}
          />
        )}
      </MapContainer>
    </div>
  );
}
