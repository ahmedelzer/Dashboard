import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { RunsSpacialAction } from "../hooks/APIsFunctions/RunsSpacialAction";
const action = [
  {
    dashboardFormSchemaActionID: "aec3c9f0-747d-41b6-986c-6caa787bb0b7",
    dashboardFormActionMethodType: "Get:isAvailable",
    routeAdderss: "ShopNode/AvailableNodeMenuItem",
    body: "",
    returnPropertyName: "",
    projectProxyRoute: "BrandingMartPOS",
    dashboardFormSchemaActionQueryParams: [
      {
        dashboardFormSchemaActionQueryParameterID:
          "5c060feb-679d-45fe-b48a-4ebce6fec77f",
        dashboardFormSchemaActionID: "e77b4a7b-7ab5-46f7-8240-0da8a3b50a25",
        parameterName: "fieldNameBarcode",
        IsRequired: true,
        dashboardFormParameterField: "fieldNameBarcode",
      },
    ],
  },
];
const BarcodeInput = ({ ...props }) => {
  //   const [scanning, setScanning] = useState(false);
  let { value, enable, title, fieldName, type, placeholder } = props;
  const [scannedValue, setScannedValue] = useState(value[fieldName] || "");
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "BARCODE_SCANNED") {
        setScannedValue(event.data.barcodeValue); // ✅ correct key
        console.log("✅ Received from scanner:", event.data.barcodeValue);
        window.focus(); // bring main window to front
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  const goToScanner = () => {
    window.open(
      "https://famous-treacle-f7ac8c.netlify.app/",
      "scannerPopup",
      "width=400,height=600"
    );
  };
  useEffect(() => {
    if (!scannedValue) return;
    value = scannedValue;
    const runAction = async () => {
      try {
        const req = await RunsSpacialAction(
          "isAvailable",
          "testID",
          scannedValue[fieldName],
          action,
          true,
          scannedValue
        );
        console.log("✅ Action completed:", req);
      } catch (error) {
        console.error("❌ Error running action:", error);
      }
    };

    runAction();
  }, [scannedValue]);

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {/* Input + Scan Button */}
      <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-white">
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={scannedValue}
          enable={enable}
          onBlur={(e) => {
            setScannedValue({ [e.target.name]: e.target.value });
          }}
          title={title}
          name={fieldName}
          className="flex-1 outline-none text-gray-800 text-sm px-2"
        />
        <button
          onClick={goToScanner}
          className={`${"bg-blue-500 hover:bg-blue-600"} text-white px-3 py-1 rounded-md transition`}
        >
          {"📷 Scan"}
        </button>
      </div>
    </div>
  );
};

export default BarcodeInput;
