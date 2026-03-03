import React, { useState, useRef, useEffect } from "react";
import { Polygon, Polyline, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { PolygonContextMenu } from "../../utils/components/ContextMenu";
import { BoundsWatcher } from "../../utils/components/BoundsWatcher";
import { reverseGeocode } from "../../utils/operation/reverseGeocode";
import "leaflet/dist/leaflet.css";

const DRAW_THRESHOLD = 0.00005;

export default function PolygonMapParameter({
  value,
  fieldName,
  title,
  enable = false,
  className,
  setBoundsData = () => {},
  fieldsType,
  setNewPolygon,
}) {
  const map = useMap();

  const [polygons, setPolygons] = useState([]);
  const [livePath, setLivePath] = useState([]);
  const [centerPoint, setCenterPoint] = useState(null);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    latlng: null,
    polygonIndex: null,
  });

  const isDrawingRef = useRef(false);
  const pathRef = useRef([]);

  const polygonFieldName = fieldsType.polygon;

  // ==============================
  //  Sync incoming value (edit mode)
  // ==============================
  useEffect(() => {
    if (!value) return;
    try {
      const parsed = typeof value === "string" ? JSON.parse(value) : value;
      if (Array.isArray(parsed) && parsed.length > 0) {
        const extractedPolygons = parsed
          .map((item) => item?.[polygonFieldName])
          .filter((points) => Array.isArray(points) && points.length > 2);
        setPolygons(extractedPolygons);
      } else {
        setPolygons([]);
      }
    } catch (err) {
      console.log("Parse error:", err);
      setPolygons([]);
    }
  }, [value, polygonFieldName]);

  // ==============================
  //  Convert touch to LatLng
  // ==============================
  const getLatLngFromTouch = (touch) => {
    const rect = map.getContainer().getBoundingClientRect();
    const point = L.point(touch.clientX - rect.left, touch.clientY - rect.top);
    return map.containerPointToLatLng(point);
  };

  // ==============================
  //  Drawing Handlers
  // ==============================
  const startDrawing = (latlng) => {
    clearAll();
    setCenterPoint(latlng);
    isDrawingRef.current = true;
    pathRef.current = [latlng];
    setLivePath([latlng]);
    map.getContainer().style.cursor = "crosshair";
    map.dragging.disable();
  };

  const drawMove = (latlng) => {
    if (!isDrawingRef.current) return;
    const last = pathRef.current[pathRef.current.length - 1];
    const distance =
      Math.abs(last.lat - latlng.lat) + Math.abs(last.lng - latlng.lng);
    if (distance < DRAW_THRESHOLD) return;
    pathRef.current.push(latlng);
    setLivePath([...pathRef.current]);
  };

  const finishDrawing = async () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    if (pathRef.current.length > 2) {
      const polygon = [...pathRef.current, pathRef.current[0]];
      const bounds = L.latLngBounds(polygon);
      const center = bounds.getCenter();
      const locationInfo = await reverseGeocode(center.lat, center.lng);
      const polygonPoints = polygon;

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
      // setPolygons((prev) => [...prev, polygon]);

      const mappedValue = {
        [fieldsType.polygon]: polygon,
        [fieldsType.centerLatitudePoint]: `${center.lat}`,
        [fieldsType.centerLongitudePoint]: `${center.lng}`,
        [fieldsType.cityISO_CodeValue]:
          locationInfo?.raw?.address?.["ISO3166-2-lvl4"],
        [fieldsType.description]: locationInfo.fullAddress,
        [fieldsType.areaName]: locationInfo.city,
        [fieldsType.radius]: radius,
      };

      setNewPolygon(mappedValue);

      // Optional: send to parent window if embedded
      window.parent.postMessage(
        { type: "newPolygonChange", payload: mappedValue },
        "*",
      );
    }

    // setLivePath([]);
    setCenterPoint(null);
    map.dragging.enable();
    map.getContainer().style.cursor = "";
  };

  // ==============================
  //  Clear All
  // ==============================
  const clearAll = () => {
    isDrawingRef.current = false;
    pathRef.current = [];
    setLivePath([]);
    setCenterPoint(null);
    // setPolygons([]);
    map.dragging.enable();
    map.getContainer().style.cursor = "";
  };

  // ==============================
  //  Map Events
  // ==============================
  useEffect(() => {
    if (!enable) return;
    const container = map.getContainer();

    const onMouseDown = (e) => {
      if (!centerPoint) startDrawing(map.mouseEventToLatLng(e));
    };
    const onMouseMove = (e) => drawMove(map.mouseEventToLatLng(e));
    const onMouseUp = finishDrawing;

    const onTouchStart = (e) => {
      e.preventDefault();
      if (!centerPoint) startDrawing(getLatLngFromTouch(e.touches[0]));
    };
    const onTouchMove = (e) => {
      e.preventDefault();
      drawMove(getLatLngFromTouch(e.touches[0]));
    };
    const onTouchEnd = (e) => {
      e.preventDefault();
      finishDrawing();
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [enable, centerPoint, map]);

  return (
    <div className={className} style={{ position: "relative" }}>
      {title && <label>{title}</label>}

      {/* Hidden form field */}
      <input
        type="hidden"
        name={fieldName}
        value={JSON.stringify(polygons)}
        readOnly
      />

      {/* BoundsWatcher */}
      <BoundsWatcher setBoundsData={setBoundsData} />

      {/* Clear Button */}
      {livePath.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            background: "white",
            padding: "6px 12px",
            borderRadius: "4px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            cursor: "pointer",
            userSelect: "none",
            touchAction: "manipulation",
          }}
          onClick={clearAll}
          onTouchStart={clearAll}
        >
          Clear
        </div>
      )}

      {/* Center Pin */}
      {centerPoint && <Marker position={centerPoint} />}

      {/* Live Path */}
      {livePath.length > 1 && (
        <Polyline
          positions={livePath}
          pathOptions={{ color: "red", weight: 3 }}
        />
      )}
      {livePath.length > 2 && (
        <Polygon
          positions={livePath}
          pathOptions={{ color: "red", fillOpacity: 0.1 }}
        />
      )}

      {/* Final Polygons */}
      {polygons.map((polygon, index) => (
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
      ))}
      <Polygon
        positions={livePath}
        pathOptions={{ color: "green", fillOpacity: 0.25 }}
        eventHandlers={{}}
      />

      {/* Context Menu */}
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
            onDelete={() =>
              setContextMenu({
                visible: false,
                latlng: null,
                polygonIndex: null,
              })
            }
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
