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
 * Toast hook using DevExtreme's `contentTemplate`
 * Supports icons, title, description, animation, and direction.
 */
export function useDisplayToast() {
  const icons = {
    success: <FaCheckCircle color="#22c55e" size={20} />,
    error: <FaTimesCircle color="#ef4444" size={20} />,
    info: <FaInfoCircle color="#3b82f6" size={20} />,
    warning: <FaExclamationTriangle color="#eab308" size={20} />,
  };

  const showToast = useCallback(
    (
      title,
      description = "",
      type = "info", // "success" | "error" | "info" | "warning"
      displayTime = 3000,
      position = "top right",
      onClick = null
    ) => {
      notify(
        {
          type,
          displayTime,
          width: 280,
          closeOnClick: true,
          animation: {
            show: {
              type: "slide",
              duration: 400,
              from: { position: { my: "top", at: "top", of: window } },
              to: { position: { my: "top", at: "top", of: window } },
            },
            hide: { type: "fade", duration: 200 },
          },
          contentTemplate: (element) => {
            // Build custom DOM manually
            const wrapper = document.createElement("div");
            wrapper.style.display = "flex";
            wrapper.style.alignItems = "flex-start";
            wrapper.style.gap = "10px";
            wrapper.style.padding = "6px 8px";
            wrapper.style.cursor = onClick ? "pointer" : "default";
            wrapper.style.fontFamily = "inherit";
            wrapper.style.color = "inherit";

            // Icon
            const iconContainer = document.createElement("div");
            iconContainer.innerHTML = renderToString(icons[type]);
            wrapper.appendChild(iconContainer);

            // Text container
            const textContainer = document.createElement("div");
            textContainer.style.display = "flex";
            textContainer.style.flexDirection = "column";

            const titleElement = document.createElement("strong");
            titleElement.textContent = title;
            titleElement.style.fontSize = "14px";
            titleElement.style.marginBottom = description ? "2px" : "0";

            textContainer.appendChild(titleElement);

            if (description) {
              const descElement = document.createElement("span");
              descElement.textContent = description;
              descElement.style.fontSize = "13px";
              descElement.style.opacity = "0.9";
              textContainer.appendChild(descElement);
            }

            wrapper.appendChild(textContainer);

            if (onClick) wrapper.onclick = onClick;

            element.appendChild(wrapper);
          },
        },
        {
          direction: "down-push",
          position,
        }
      );
    },
    []
  );

  return { showToast };
}
