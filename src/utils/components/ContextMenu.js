import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

/* =========================
   🟦 CONTEXT MENU COMPONENT
========================= */
export function PolygonContextMenu({ latlng, onClose, onDelete, onEdit }) {
  const map = useMap();
  const [point, setPoint] = useState(null);

  useEffect(() => {
    if (!latlng) return;

    const p = map.latLngToContainerPoint(latlng);
    setPoint(p);
  }, [latlng, map]);

  // Close menu when clicking map
  useEffect(() => {
    function closeMenu() {
      onClose();
    }

    map.on("click", closeMenu);

    return () => {
      map.off("click", closeMenu);
    };
  }, [map, onClose]);

  if (!point) return null;

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 99999,
        background: "white",
        borderRadius: "10px",
        boxShadow: "0px 6px 15px rgba(0,0,0,0.25)",
        padding: "8px",
        left: point.x,
        top: point.y,
        minWidth: "180px",
        transform: "translate(-10%, 0)",
        border: "1px solid #ddd",
      }}
    >
      <div
        style={{
          padding: "8px",
          cursor: "pointer",
          borderBottom: "1px solid #eee",
        }}
        onClick={onEdit}
      >
        ✏️ Edit Polygon
      </div>

      <div
        style={{
          padding: "8px",
          cursor: "pointer",
          borderBottom: "1px solid #eee",
          color: "red",
          fontWeight: "bold",
        }}
        onClick={onDelete}
      >
        🗑 Delete Polygon
      </div>

      <div
        style={{
          padding: "8px",
          cursor: "pointer",
        }}
        onClick={onClose}
      >
        ❌ Close
      </div>
    </div>
  );
}
