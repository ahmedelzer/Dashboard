import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const BarcodeInput = ({ onChange }) => {
  const [value, setValue] = useState("");
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const videoRef = useRef(null);
  const readerRef = useRef(null);

  useEffect(() => {
    const initDevices = async () => {
      try {
        const reader = new BrowserMultiFormatReader();
        readerRef.current = reader;

        let videoDevices = [];

        // ✅ Support both old and new APIs
        if (
          typeof BrowserMultiFormatReader.listVideoInputDevices === "function"
        ) {
          videoDevices = await BrowserMultiFormatReader.listVideoInputDevices();
        } else if (
          typeof navigator.mediaDevices?.enumerateDevices === "function"
        ) {
          const devices = await navigator.mediaDevices.enumerateDevices();
          videoDevices = devices.filter((d) => d.kind === "videoinput");
        }

        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        } else {
          console.error("No camera devices found.");
        }
      } catch (err) {
        console.error("Error getting cameras:", err);
      }
    };

    initDevices();

    return () => {
      stopScanner();
    };
  }, []);

  useEffect(() => {
    if (!scanning || !selectedDeviceId) return;

    const startScanner = async () => {
      try {
        const reader = readerRef.current;
        if (!reader) return;

        await reader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          (result, error) => {
            if (result) {
              const text = result.getText();
              setValue(text);
              onChange?.(text);
              stopScanner();
            }
          }
        );
      } catch (error) {
        console.error("Error starting scanner:", error);
        stopScanner();
      }
    };

    startScanner();
  }, [scanning, selectedDeviceId, onChange]);

  const stopScanner = () => {
    const reader = readerRef.current;
    if (reader) reader.reset();
    setScanning(false);
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {/* Input + Scan Button */}
      <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-white">
        <input
          type="text"
          placeholder="Enter or scan code"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e.target.value);
          }}
          className="flex-1 outline-none text-gray-800 text-sm px-2"
        />
        <button
          onClick={() => setScanning((prev) => !prev)}
          className={`${
            scanning
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-3 py-1 rounded-md transition`}
        >
          {scanning ? "✖ Stop" : "📷 Scan"}
        </button>
      </div>

      {/* Camera Selector */}
      {devices.length > 1 && (
        <select
          onChange={(e) => setSelectedDeviceId(e.target.value)}
          value={selectedDeviceId || ""}
          className="border rounded-md p-2 text-sm"
        >
          {devices.map((d) => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label || `Camera ${d.deviceId}`}
            </option>
          ))}
        </select>
      )}

      {/* Video Preview */}
      {scanning && (
        <div className="relative mt-2 border border-gray-300 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            style={{ width: "100%", height: "250px", objectFit: "cover" }}
            muted
            playsInline
          />
        </div>
      )}
    </div>
  );
};

export default BarcodeInput;
