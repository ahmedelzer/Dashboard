import React, { useEffect, useState } from "react";

const BarcodeIframe = () => {
  const [scannedValue, setScannedValue] = useState("");

  useEffect(() => {
    const handleMessage = (event) => {
      // You can add domain checks here instead of "*"
      if (event.data?.type === "BARCODE_SCANNED") {
        setScannedValue(event.data.value);
        console.log("📥 Received from iframe:", event.data.value);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Scan a Barcode</h2>

      <iframe
        src="https://ihs-solutions.com:7552/scanbarcode"
        title="Scanner"
        allow="camera; microphone; fullscreen; display-capture"
        style={{
          width: "100%",
          height: "450px",
          border: "1px solid #ccc",
        }}
      ></iframe>

      <div style={{ marginTop: "20px" }}>
        <strong>Scanned Value:</strong> {scannedValue || "Waiting..."}
      </div>
    </div>
  );
};

export default BarcodeIframe;
