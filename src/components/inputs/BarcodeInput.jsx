import React, { useEffect, useState } from "react";
import { RunsSpacialAction } from "../hooks/APIsFunctions/RunsSpacialAction";
import { useConfirmAction } from "../hooks/customHooks/useConfirmAction";

const BarcodeInput = ({ ...props }) => {
  const {
    value,
    enable,
    title,
    fieldName,
    placeholder,
    specialActions,
    setDependenceRow,
  } = props;
  const [scannedValue, setScannedValue] = useState(value || "");
  const { confirmAndRun, ConfirmModal } = useConfirmAction();

  // Listen for scanned message
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data?.type === "BARCODE_SCANNED") {
        setScannedValue(event.data.barcodeValue);
        await triggerAction(event.data.barcodeValue);
        console.log("✅ Received from scanner:", event.data.barcodeValue);
        window.focus();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Open external barcode scanner popup
  const goToScanner = () => {
    window.open(
      "https://ihs-solutions.com:7552/scanbarcode",
      "scannerPopup",
      "width=400,height=600"
    );
  };

  // Handle Enter key or mobile submit
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await triggerAction(e.target.value);
    }
  };

  const handleSubmitMobile = async (e) => {
    e.preventDefault();
    await triggerAction(scannedValue);
  };

  // Function to run your special action
  const triggerAction = async (val) => {
    if (!val) return;
    const action = specialActions.find(
      (ac) => ac.dashboardFormActionMethodType.split(":")[1] === fieldName
    );
    confirmAndRun(action, () => sendRequest(val));
  };
  const sendRequest = async (val) => {
    try {
      const req = await RunsSpacialAction(
        fieldName,
        "testID",
        val,
        specialActions,
        true,
        { [fieldName]: val }
      );
      setDependenceRow(() => req.data);

      console.log("✅ Action completed:", req);
    } catch (error) {
      console.error("❌ Error running action:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmitMobile}
      className="flex flex-col gap-3 w-full max-w-sm"
    >
      {/* Input + Scan Button */}
      <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-white">
        <input
          type="text"
          placeholder={placeholder}
          value={scannedValue}
          disabled={!enable}
          onChange={(e) => setScannedValue(e.target.value)}
          onKeyDown={handleKeyDown} // 🔹 triggers on Enter key press
          title={title}
          name={fieldName}
          className="flex-1 outline-none text-gray-800 text-sm px-2"
        />
        <button
          type="button"
          onClick={goToScanner}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
        >
          📷 Scan
        </button>
      </div>
      {ConfirmModal}
    </form>
  );
};

export default BarcodeInput;
