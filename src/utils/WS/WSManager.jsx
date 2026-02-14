import { WSclass } from "../../components/hooks/FormsFunctions/WSclass";
// import {
//   addInstance,
//   addInstanceStateHandlingMessage,
//   removeInstance,
// } from "../../reducers/WS_Reducer";
// import { store } from "../../store/reduxStore";

export function getWSInstance(baseUrl, url, onMessageCallback) {
  if (!baseUrl || !url) {
    throw new Error("baseUrl and url are required");
  }

  const wsInstances = [];
  // console.log("getWSInstance called with:", { baseUrl, url });
  // console.log(
  //   "wsInstances:",
  //   wsInstances.map((inst) => ({
  //     key: inst.key,
  //     url: inst.url,
  //     wsType: inst.ws?.constructor?.name || "Unknown",
  //     handlerCount: inst.handlingMessages?.length || 0,
  //   }))
  // );

  let instance = wsInstances.find((inst) => inst.key === baseUrl);

  const isClosed =
    !instance ||
    instance.ws.readyState === WebSocket.CLOSING ||
    instance.ws.readyState === WebSocket.CLOSED ||
    instance.url !== url;

  if (isClosed) {
    if (instance && instance.url !== url) {
      console.log(`🔄 URL changed from ${instance.url} to ${url}`);
      disconnectWS(baseUrl, true); // Force disconnect
    }
    const wsInstance = new WSclass(url);

    try {
      const removeHandler = wsInstance.connect(() => {
        if (typeof onMessageCallback === "function") {
          console.log("Adding message handler for new instance:", url);
          return wsInstance.addMessageHandler(onMessageCallback);
        }
      });

      // store.dispatch(removeInstance({ key: baseUrl }));
      // store.dispatch(
      //   addInstance({
      //     key: baseUrl,
      //     url,
      //     ws: wsInstance,
      //     handlingMessages:
      //       typeof onMessageCallback === "function" ? [onMessageCallback] : [],
      //     connected: true,
      //   })
      // );

      return { instance: wsInstance, removeHandler };
    } catch (error) {
      console.error("Failed to create WebSocket instance:", error);
      throw error;
    }
  } else {
    console.log("♻️ Reusing existing WebSocket instance", url);
    console.log(
      "instance.ws type:",
      instance.ws?.constructor?.name || "Unknown"
    );
    console.log(
      "Available methods:",
      instance.ws
        ? Object.getOwnPropertyNames(Object.getPrototypeOf(instance.ws))
        : "No ws"
    );

    if (!(instance.ws instanceof WSclass)) {
      console.error("Invalid ws instance: not a WSclass object", instance.ws);
      console.log("🆕 Recovering by creating new WebSocket instance", url);
      disconnectWS(baseUrl, true); // Force disconnect
      const wsInstance = new WSclass(url);

      try {
        const removeHandler = wsInstance.connect(() => {
          if (typeof onMessageCallback === "function") {
            console.log("Adding message handler for recovered instance:", url);
            return wsInstance.addMessageHandler(onMessageCallback);
          }
        });

        // store.dispatch(removeInstance({ key: baseUrl }));
        // store.dispatch(
        //   addInstance({
        //     key: baseUrl,
        //     url,
        //     ws: wsInstance,
        //     handlingMessages:
        //       typeof onMessageCallback === "function"
        //         ? [onMessageCallback]
        //         : [],
        //     connected: true,
        //   })
        // );

        return { instance: wsInstance, removeHandler };
      } catch (error) {
        console.error("Failed to recover WebSocket instance:", error);
        throw error;
      }
    }

    if (typeof onMessageCallback === "function") {
      if (!instance.handlingMessages.includes(onMessageCallback)) {
        try {
          console.log("Adding message handler to existing instance:", url);
          const removeHandler =
            instance.ws.addMessageHandler(onMessageCallback);
          // store.dispatch(
          //   addInstanceStateHandlingMessage({
          //     key: baseUrl,
          //     handlingMessage: onMessageCallback,
          //   })
          // );
          return { instance: instance.ws, removeHandler };
        } catch (error) {
          console.error("Failed to add message handler:", error);
          throw error;
        }
      } else {
        console.log("⚠️ Message handler already registered for", url);
      }
    }

    if (instance.ws.readyState !== WebSocket.OPEN) {
      try {
        console.log("Reconnecting WebSocket:", url);
        instance.ws.connect();
      } catch (error) {
        console.error("Failed to reconnect WebSocket:", error);
        throw error;
      }
    }

    return { instance: instance.ws };
  }
}

export function disconnectWS(baseUrl, force = false) {
  if (!baseUrl) {
    console.warn("No baseUrl provided for disconnectWS");
    return;
  }

  const wsInstances = [];
  const instance = wsInstances.find((inst) => inst.key === baseUrl);

  if (instance) {
    if (force || instance.handlingMessages.length === 0) {
      try {
        instance.ws.disconnect();
        // store.dispatch(removeInstance({ key: baseUrl }));
        console.log("🔌 WebSocket disconnected:", baseUrl);
      } catch (error) {
        console.error("Failed to disconnect WebSocket:", error);
      }
    } else {
      console.log(
        "⚠️ Keeping connection alive - active handlers:",
        instance.handlingMessages.length
      );
    }
  } else {
    console.log("⚠️ No WebSocket instance found for baseUrl:", baseUrl);
  }
}

export function isWSConnected(baseUrl) {
  const wsInstances = [];
  const instance = wsInstances.find((inst) => inst.key === baseUrl);
  return instance?.ws?.readyState === WebSocket.OPEN || false;
}
