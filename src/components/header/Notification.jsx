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
import { languageID, token } from "../../request";
import { WSOperation } from "../hooks/FormsFunctions/WSOperation";
import { LanguageContext } from "../../contexts/Language";
function Notification() {
  const { notifications, setNotifications } = useAuth();
  const { localization, languageID } = useContext(LanguageContext);
  //todo when get message add it in notifications and then run function that displays notify and make the header behaver as he do
  const navigate = useNavigate();
  const [notificationsNewNum, setNotificationsNewNum] = useState(
    notifications?.length
  );
  const { isOnline } = useNetworkStatus();
  useEffect(() => {
    // Early return if token is missing or offline
    if (!token || !isOnline) return;

    // Create a new WebSocket connection
    const WS = new WSclass(
      `/Notifications?token=${token}&languageID=${languageID}`
    );

    // Clear notifications when reconnecting
    setNotifications([]); // Reset notifications to an empty array

    // Connect the WebSocket
    WS.connect();
    console.log("WebSocket connected");

    // Handle incoming messages and show notifications
    WS.ReciveMessages(showNotification);

    // Cleanup function to disconnect WebSocket on unmount or offline status
    return () => {
      setNotifications([]); // Clear notifications again on cleanup
      WS.disconnect();
      console.log("WebSocket disconnected");
    };
  }, [token, isOnline, languageID]); // Re-run effect when token, online status or languageID changes

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
    if (decodedString !== "ping") {
      // If the JSON inside is double-encoded (with escaped quotes), parse it again
      const parsedData = JSON.parse(decodedString);
      const RecivedNotificationsWihotkeyslower =
        parsedData.ope === "Context"
          ? JSON.parse(parsedData.notifications)
          : [parsedData.notifications];
      // Function to recursively convert object keys to lowercase
      const toLowerCaseKeys = (obj) => {
        if (Array.isArray(obj)) {
          return obj.map(toLowerCaseKeys); // Process each element if it's an array
        } else if (obj !== null && typeof obj === "object") {
          return Object.keys(obj).reduce((acc, key) => {
            acc[key.toLowerCase()] = toLowerCaseKeys(obj[key]); // Convert keys and recurse
            return acc;
          }, {});
        }
        return obj; // Return the value if it's not an object or array
      };

      // Convert all keys of RecivedNotifications to lowercase
      const RecivedNotifications = toLowerCaseKeys(
        RecivedNotificationsWihotkeyslower
      );
      console.log(RecivedNotifications);
      const margeNotifications = [...RecivedNotifications, ...notifications];
      setNotifications((prevNotifications) => [
        ...RecivedNotifications, // New notifications
        ...prevNotifications, // Existing notifications
      ]);
      setNotificationsNewNum(margeNotifications.length);

      function handleNotifyClick(notification) {
        return redirect(
          `/${notification.notificationLink}?notificationLinkID=${notification.notificationSearchID}`
        );
      }
      if (RecivedNotifications.length > 0) {
        RecivedNotifications.forEach((notification) => {
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
      }
    }
    // notifications.forEach((notification) => {
    //   notify(
    //     {
    //       message: notification.message,
    //       type: "info",
    //       displayTime: 3500,
    //       width: 250,
    //       animation: {
    //         show: {
    //           type: "slide",
    //           duration: 400,
    //           from: { position: { my: "top", at: "top", of: window } },
    //           to: { position: { my: "top", at: "top", of: window } },
    //         },
    //         hide: { type: "fade", duration: 200 },
    //       },
    //       contentTemplate: (element) => {
    //         const content = document.createElement("div");
    //         content.textContent = localization.notification.buttonClick;
    //         content.style.cursor = "pointer";
    //         content.className = "!p-2 !m-1 color btn text-md font-bold";
    //         content.onclick = () => handleNotifyClick(notification);
    //         element.appendChild(content);
    //       },
    //     },
    //     {
    //       direction: "down-push",
    //       position: "top right",
    //     }
    //   );
    // });

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
        text: notification.message,
        icon: "message",
        onClick: () => {
          console.log(
            `/${notification.notificationLink}?notificationLinkID=${notification.notificationSearchID}`
          );
          redirect(
            `/${notification.notificationlink}?notificationLinkID=${notification.notificationsearchid}`
          );
        },
      })),
    [notifications, navigate]
  );

  return (
    <div>
      {notificationsNewNum > 0 && (
        <span className="absolute top-0 right-0  inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
          {notificationsNewNum}
        </span>
      )}

      <ContextMenu
        items={menuItems}
        target={".notifications-button"}
        showEvent={"dxclick"}
        width={210}
        cssClass={"user-menu"}
        className="max-h-72 overflow-y-auto"
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
