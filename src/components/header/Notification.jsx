import { Template } from "devextreme-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import List from "devextreme-react/list";
import "../user-panel/UserPanel.scss";
import ContextMenu, { Position } from "devextreme-react/context-menu";
import notify from "devextreme/ui/notify";
import { useAuth } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";
import useNetworkStatus from "../hooks/APIsFunctions/useNetworkStatus";
import { WSclass } from "../hooks/FormsFunctions/WSclass";
import { token } from "../../request";
import { WSOperation } from "../hooks/FormsFunctions/WSOperation";
import { LanguageContext } from "../../contexts/Language";
function Notification() {
  const { notifications, setNotifications } = useAuth();
  const { localization } = useContext(LanguageContext);

  const navigate = useNavigate();
  const [notificationsNum, setNotificationsNum] = useState(
    notifications?.length
  );
  const { isOnline } = useNetworkStatus();
  useEffect(() => {
    // Early return if token is missing or offline
    if (!token || !isOnline) return;
    const WS = new WSclass(`ws://localhost:8080`);
    // const WS = new WSclass(`/PushNotification?token=${token}`);

    WS.connect();
    console.log("WebSocket connected");
    WS.ReciveMessages(showNotification);

    // Cleanup function to disconnect WebSocket on unmount or offline status
    return () => {
      WS.disconnect();
      console.log("WebSocket disconnected");
    };
  }, [token, isOnline]); // Re-run effect when token or online status changes
  // WSClient.ReciveMessages((datasources) => {
  //   let schemaDataSource = Schemas?.map(
  //     (data) => datasources[0][data?.dataSourceName]
  //   );
  //   setData(schemaDataSource);
  // });
  // useEffect(()=>{
  //   if()
  // },[isOnline])
  // Custom notification handler to display with click support
  const showNotification = (notificationencode) => {
    const decodedString = decodeURIComponent(notificationencode);
    function handleNotifyClick(notification) {
      return redirect(
        `/${notification.notificationLink}?notificationLinkID=${notification.notificationPortalItemID}`
      );
    }
    // If the JSON inside is double-encoded (with escaped quotes), parse it again
    const parsedData = JSON.parse(decodedString);
    const notifications = JSON.parse(parsedData.notifications);
    console.log("====================================");
    console.log(parsedData, notifications);
    console.log("====================================");
    notifications.forEach((notification) => {
      notify(
        {
          message: notification.message,
          type: "info",
          displayTime: 3500,
          width: 250,
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
            const content = document.createElement("div");
            content.textContent = localization.notification.buttonClick;
            content.style.cursor = "pointer";
            content.className = "!p-2 !m-1 color btn text-md font-bold";
            content.onclick = () => handleNotifyClick(notification);
            element.appendChild(content);
          },
        },
        {
          direction: "down-push",
          position: "top right",
        }
      );
    });

    // WSOperation(notification, notifications, setNotifications);
  };

  // Display notifications on mount
  // useEffect(() => {
  //   notifications.forEach((notification) => {
  //     showNotification(notification);
  //   });
  // }, [notifications]);

  // Redirect to notification link route
  function redirect(route) {
    console.log(route);

    navigate(route);
  }

  // Create menu items from notifications with custom onClick handlers
  const menuItems = useMemo(
    () =>
      notifications.map((notification) => ({
        text: notification.notifications.Message,
        icon: "message",
        onClick: () => {
          console.log(
            `Notification clicked: ${notification.notifications.Message}`
          );
          redirect(
            `/${notification.notifications.NotificationLink}?notificationLinkID=${notification.notifications.NotificationPortalItemID}`
          );
        },
      })),
    [notifications, navigate]
  );

  return (
    <div>
      {notificationsNum > 0 && (
        <span className="absolute top-0 right-0  inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
          {notificationsNum}
        </span>
      )}

      <ContextMenu
        items={menuItems}
        target={".notifications-button"}
        showEvent={"dxclick"}
        width={210}
        cssClass={"user-menu"}
      >
        <Position
          my={{ x: "center", y: "top" }}
          at={{ x: "center", y: "bottom" }}
        />
      </ContextMenu>
    </div>
  );
}

export default Notification;
