import notify from "devextreme/ui/notify";
import { useCallback } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { renderToString } from "react-dom/server";
/**
 * Custom React hook for displaying DevExtreme toasts with icons.
 *
 * Usage:
 *   const { showToast } = useDisplayToast();
 *   showToast("Saved!", "Data updated successfully.", "success");
 */
export function useDisplayToast() {
  const icons = {
    success: <FaCheckCircle className="text-green-500" />,
    error: <FaTimesCircle className="text-red-500" />,
    info: <FaInfoCircle className="text-blue-500" />,
    warning: <FaExclamationTriangle className="text-yellow-500" />,
  };

  const showToast = useCallback(
    (
      title,
      description = "",
      type = "info", // "success" | "error" | "info" | "warning"
      displayTime = 3000,
      position = "bottom center" // DevExtreme position string
    ) => {
      notify(
        {
          message: `
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px;line-height:1.2;">
                ${renderToString(icons[type])}
              </span>
              <div style="display:flex;flex-direction:column;">
                <strong>${title}</strong>
                ${description ? `<small>${description}</small>` : ""}
              </div>
            </div>
          `,
          type, // DevExtreme's type prop supports: 'info', 'success', 'warning', 'error'
          displayTime,
          position,
        },
        {
          shading: false,
        }
      );
    },
    []
  );

  return { showToast };
}
