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
import { PolygonContextMenu } from "../../utils/components/ContextMenu";
import { BoundsWatcher } from "../../utils/components/BoundsWatcher";
import { reverseGeocode } from "../../utils/operation/reverseGeocode";

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
  onPolygonFinished = () => {},
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

    async mouseup() {
      if (!isDrawing) return;

      setIsDrawing(false);

      if (pathRef.current.length > 2) {
        const polygon = [...pathRef.current, pathRef.current[0]];
        setFinalPolygon(polygon);

        // ✅ Get polygon center using Leaflet bounds
        const bounds = L.latLngBounds(polygon);
        const center = bounds.getCenter();

        // ✅ Reverse Geocode center point
        const locationInfo = await reverseGeocode(center.lat, center.lng);

        // ✅ Send result to parent
        onPolygonFinished({
          polygon,
          centerLat: center.lat,
          centerLng: center.lng,
          ...locationInfo,
        });
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
   🧩 MAIN COMPONENT
========================= */
export default function PolygonMapParameter({
  value,
  fieldName,
  title,
  enable = false,
  className,
  setBoundsData = () => {},
  setNewPolygon,
  fieldsType,
}) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [livePath, setLivePath] = useState([]);
  const polygonFieldName = fieldsType.polygon;
  // ✅ NOW ARRAY OF POLYGONS
  const [oldPolygons, setOldPolygons] = useState([]);
  const [newPolygon, setNewPolygonState] = useState(null);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    latlng: null,
    polygonIndex: null,
  });

  /* 🔁 Sync incoming value (edit mode) */
  useEffect(() => {
    if (value) {
      try {
        const parsed = typeof value === "string" ? JSON.parse(value) : value;

        if (Array.isArray(parsed) && parsed.length > 0) {
          const extractedPolygons = parsed
            .map((item) => item?.[polygonFieldName])
            .filter((points) => Array.isArray(points) && points.length > 2);

          setOldPolygons(extractedPolygons);
          setNewPolygonState(null); // ✅ reset new polygon when value changes
        } else {
          setOldPolygons([]);
          setNewPolygonState(null);
        }
      } catch (err) {
        console.log("Parse error:", err);
        setOldPolygons([]);
        setNewPolygonState(null);
      }
    }
  }, [value, polygonFieldName]);

  const finalPolygons = newPolygon ? [...oldPolygons, newPolygon] : oldPolygons;

  /* 🧾 Serialize polygons */
  const serializedValue =
    finalPolygons.length > 0 ? JSON.stringify(finalPolygons) : "";

  return (
    <div className={className} style={{ position: "relative" }}>
      {title && <label>{title}</label>}

      {/* ✅ HIDDEN FORM FIELD */}
      <input type="hidden" name={fieldName} value={serializedValue} readOnly />

      <BoundsWatcher setBoundsData={setBoundsData} />

      {/* ✍️ DRAW HANDLER */}
      {enable && (
        <DrawHandler
          isDrawing={isDrawing}
          setIsDrawing={setIsDrawing}
          livePath={livePath}
          setLivePath={setLivePath}
          setFinalPolygon={(polygon) => {
            if (polygon.length > 2) {
              setNewPolygonState(polygon); // ✅ always overwrite only the new polygon
            }
          }}
          onPolygonFinished={(data) => {
            const polygonPoints = data.polygon;

            let maxDistance = 0;

            for (let i = 0; i < polygonPoints.length; i++) {
              for (let j = i + 1; j < polygonPoints.length; j++) {
                const dist = L.latLng(polygonPoints[i]).distanceTo(
                  L.latLng(polygonPoints[j]),
                );

                if (dist > maxDistance) {
                  maxDistance = dist;
                }
              }
            }
            const radius = maxDistance / 2 / 1000;
            const mappedValue = {
              [fieldsType.polygon]: data.polygon,
              [fieldsType.centerLatitudePoint]: `${data.centerLat}`,
              [fieldsType.centerLongitudePoint]: `${data.centerLng}`,
              [fieldsType.cityISO_CodeValue]:
                data?.raw?.address?.["ISO3166-2-lvl4"],
              [fieldsType.description]: data.fullAddress,
              [fieldsType.areaName]: data.city,
              [fieldsType.radius]: radius, // if you calculate later
            };

            setNewPolygon(mappedValue);
          }}
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

      {/* ✅ FINAL POLYGONS */}
      {finalPolygons.length > 0 &&
        finalPolygons.map((polygon, index) =>
          polygon.length > 2 ? (
            <Polygon
              key={index}
              positions={polygon}
              pathOptions={{ color: "#1E88E5", fillOpacity: 0.25 }}
              eventHandlers={{
                contextmenu: (e) => {
                  e.originalEvent.preventDefault();

                  setContextMenu({
                    visible: true,
                    latlng: e.latlng,
                    polygonIndex: index,
                  });
                },
              }}
            />
          ) : null,
        )}

      {/* RIGHT CLICK MENU */}
      {contextMenu.visible &&
        contextMenu.latlng &&
        contextMenu.polygonIndex !== null && (
          <PolygonContextMenu
            latlng={contextMenu.latlng}
            onClose={() =>
              setContextMenu({
                visible: false,
                latlng: null,
                polygonIndex: null,
              })
            }
            onDelete={() => {
              setNewPolygon((prev) =>
                prev.filter((_, i) => i !== contextMenu.polygonIndex),
              );

              setContextMenu({
                visible: false,
                latlng: null,
                polygonIndex: null,
              });
            }}
            onEdit={() => {
              alert("Edit Polygon Clicked 😄");

              setContextMenu({
                visible: false,
                latlng: null,
                polygonIndex: null,
              });
            }}
          />
        )}
    </div>
  );
}
