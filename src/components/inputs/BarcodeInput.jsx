import React, { useContext, useEffect, useState } from "react";
import { RunsSpacialAction } from "../hooks/APIsFunctions/RunsSpacialAction";
import { useConfirmAction } from "../hooks/customHooks/useConfirmAction";
import { Input } from "reactstrap";
import { LanguageContext } from "../../contexts/Language";
import { useNetwork } from "../../contexts/NetworkContext";

const BarcodeInput = ({ ...props }) => {
  const {
    value,
    enable,
    title,
    fieldName,
    placeholder,
    specialActions,
    setDependenceRow,
    formSchemaParameters,
  } = props;
  const [scannedValue, setScannedValue] = useState(value || null);
  const { confirmAndRun, ConfirmModal } = useConfirmAction();
  const { localization } = useContext(LanguageContext);
  const { setReloadTab } = useNetwork();
  const idField = formSchemaParameters.find(
    (param) => param.isIDField
  ).parameterField;
  const action = specialActions?.find(
    (ac) => ac.dashboardFormActionMethodType.split(":")[1] === fieldName
  );
  // Listen for scanned message
  useEffect(() => {
    if (!specialActions || !action) return;
    const handleMessage = async (event) => {
      if (event.data?.type === "BARCODE_SCANNED") {
        setScannedValue(event.data.barcodeValue);
        console.log("✅ Received from scanner:", event.data.barcodeValue);
        // can you here run onSubmit of the form
        await triggerAction(event.data.barcodeValue); // new API that triggers form's onSubmit
        await setReloadTab(() => false);
        window.focus();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [action]);

  // Open external barcode scanner popup
  const goToScanner = async () => {
    await setReloadTab(() => false);
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

    confirmAndRun(action, () => sendRequest(val));
  };
  const sendRequest = async (val) => {
    try {
      const req = await RunsSpacialAction(
        fieldName,
        val[idField],
        true,
        specialActions,
        false,
        { [fieldName]: val }
      );
      if (req.success) {
        setDependenceRow(() => req.data);
      }

      console.log("✅ Action completed:", req);
    } catch (error) {
      console.error("❌ Error running action:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmitMobile}
      action=""
      method="post"
      className="flex flex-col gap-3 w-full max-w-sm"
    >
      {/* Input + Scan Button */}
      <div className="flex items-center border border-border rounded-lg p-2 bg-body">
        <input
          type="text"
          placeholder={placeholder}
          value={scannedValue || value || ""}
          disabled={!enable}
          onChange={(e) => setScannedValue(e.target.value)}
          onKeyDown={handleKeyDown} // 🔹 triggers on Enter key press
          title={title}
          name={fieldName}
          className="flex-1 outline-none text-text text-sm px-2"
        />
        <button
          type="button"
          onClick={goToScanner}
          disabled={!enable}
          className="bg-accent text-bg px-3 py-1 rounded-md transition"
        >
          {localization.inputs.scanInput.scan}
        </button>
      </div>
      {ConfirmModal}
    </form>
  );
};

export default BarcodeInput;
