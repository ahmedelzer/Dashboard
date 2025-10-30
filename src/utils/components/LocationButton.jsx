import React from "react";
// import { EntypoLocationPin } from "react-icons/entypo";
import { IoMdPin } from "react-icons/io";
export default function LocationButton({ latitude, longitude, children }) {
  const handleOpenMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <button
        onClick={handleOpenMap}
        className="bg-accent my-2 px-4 py-2 rounded-lg flex items-center justify-center hover:bg-accent/80 transition"
        title="Open in Google Maps"
      >
        <IoMdPin size={22} className="text-bg" />
        {children}
      </button>
    </div>
  );
}
