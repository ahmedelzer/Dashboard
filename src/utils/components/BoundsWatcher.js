import { useMapEvents } from "react-leaflet";

export function BoundsWatcher({ setBoundsData }) {
  const map = useMapEvents({
    moveend() {
      const bounds = map.getBounds();
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      setBoundsData({
        northEastLatitude: ne.lat,
        northEastLongitude: ne.lng,
        southWestLatitude: sw.lat,
        southWestLongitude: sw.lng,
      });
    },
    zoomend() {
      const bounds = map.getBounds();
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      setBoundsData({
        northEastLatitude: ne.lat,
        northEastLongitude: ne.lng,
        southWestLatitude: sw.lat,
        southWestLongitude: sw.lng,
      });
    },
  });

  return null;
}
