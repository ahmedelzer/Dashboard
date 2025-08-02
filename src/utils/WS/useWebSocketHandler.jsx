import { useEffect, useRef } from "react";
import { ConnectToWS } from "./ConnectToWS";
import { WSMessageHandler } from "./handleWSMessage";

const useWebSocketHandler = ({
  WS_Connected,
  setWS_Connected,
  setWSsetMessage,
  _WSsetMessage,
  SetReoute,
  projectProxyRoute,
  rows,
  totalCount,
  fieldsType,
  reducerDispatch,
  dispatchType = "WS_OPE_ROW",
  active = true,
  refreshTrigger = null,
}) => {
  const wsRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    // Clean up existing WS if any
    if (wsRef.current) {
      if (typeof wsRef.current.close === "function") {
        wsRef.current.close();
      }
      wsRef.current = null;
      setWS_Connected(false);
    }

    if (SetReoute && projectProxyRoute) SetReoute(projectProxyRoute);

    ConnectToWS(setWSsetMessage, setWS_Connected)
      .then((ws) => {
        wsRef.current = ws;
        console.log("🔌 WebSocket connected");
      })
      .catch((e) => {
        console.error("❌ WebSocket connection failed", e);
      });

    return () => {
      if (wsRef.current) {
        if (typeof wsRef.current.close === "function") {
          wsRef.current.close();
        }
        wsRef.current = null;
        setWS_Connected(false);
      }
    };
  }, [active, refreshTrigger, SetReoute, projectProxyRoute, setWSsetMessage, setWS_Connected]);

  useEffect(() => {
    if (rows?.length > 0 && _WSsetMessage) {


     const _handleWSMessage = new WSMessageHandler({
        _WSsetMessage,
        fieldsType,
        rows,
        totalCount,
        callbackReducerUpdate: async (ws_updatedRows) => {
          if (!reducerDispatch) return;
          await reducerDispatch({
            type: dispatchType,
            payload: {
              rows: ws_updatedRows.rows,
              totalCount: ws_updatedRows.totalCount,
            },
          });
        },
      });
      _handleWSMessage.process();
    }
  }, [_WSsetMessage, rows, fieldsType, totalCount, reducerDispatch, dispatchType]);
};

export default useWebSocketHandler;
