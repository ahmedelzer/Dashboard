import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import {
  MdSignalWifi1Bar,
  MdSignalWifi2Bar,
  MdSignalWifi3Bar,
  MdSignalWifi4Bar,
  MdWifiOff,
} from "react-icons/md";
// import { isRTL } from "../src/utils/operation/isRTL";
import { SetIsOnline } from "../request";
import { RunOnlyInDeployment } from "../utils/operation/RunOnlyInDeployment";
import { LanguageContext } from "./Language";

const NetworkContext = createContext({
  status: {
    isConnected: true,
    isInternetReachable: true,
    connectionType: "unknown",
    lastUpdated: null,
  },
  isOnline: true,
  checkNetwork: async () => {},
});

export const NetworkProvider = ({ children }) => {
  const [status, setStatus] = useState({
    isConnected: true,
    isInternetReachable: true,
    connectionType: "unknown",
    lastUpdated: null,
  });
  const { Right, localization } = useContext(LanguageContext);

  const [isOnline, setIsOnline] = useState(true);
  const [speedLevel, setSpeedLevel] = useState(4);
  const [reloadTab, setReloadTab] = useState(true);

  const checkNetwork = useCallback(async () => {
    try {
      const online = navigator.onLine;
      setStatus({
        isConnected: online,
        isInternetReachable: online,
        connectionType: "wifi",
        lastUpdated: new Date(),
      });
      setIsOnline(online);
    } catch (error) {
      console.error("Network check failed:", error);
      setStatus({
        isConnected: false,
        isInternetReachable: false,
        connectionType: "unknown",
        lastUpdated: new Date(),
      });
      setIsOnline(false);
    }
  }, []);

  const testNetworkSpeed = async () => {
    try {
      const start = Date.now();
      const response = await fetch("https://ihs-solutions.com/healthy", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) throw new Error("Network ping failed");

      const end = Date.now();
      const duration = end - start; // ms ping

      // Map ms → speed level (tweak thresholds as needed)
      if (duration > 2000) {
        setSpeedLevel(0); // 🚫 very poor
        // setIsOnline(false);
      } else if (duration > 1000) setSpeedLevel(1); // weak
      else if (duration > 500) setSpeedLevel(2); // fair
      else if (duration > 200) setSpeedLevel(3); // good
      else setSpeedLevel(4); // excellent
    } catch (error) {
      setSpeedLevel(0);
      //setIsOnline(false);
    }
  };

  const verifyInternet = useCallback(async () => {
    try {
      const online = navigator.onLine;
      if (!online) {
        SetIsOnline(false);
        setIsOnline(false);
        return;
      }
      RunOnlyInDeployment(async () => {
        await testNetworkSpeed();
      });
    } catch (error) {
      console.error("verifyInternet error:", error);
      SetIsOnline(false);
      setIsOnline(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(verifyInternet, 2000);
    return () => clearInterval(interval);
  }, [verifyInternet]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      checkNetwork();
    };
    const handleOffline = () => {
      setIsOnline(false);
      checkNetwork();
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && reloadTab) {
        RunOnlyInDeployment(() => {
          window.location.reload();
        });
      }
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    checkNetwork();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkNetwork, reloadTab]);

  const renderWifiIcon = () => {
    switch (speedLevel) {
      case 1:
        return <MdSignalWifi1Bar size={20} className="text-bg" />;
      case 2:
        return <MdSignalWifi2Bar size={20} className="text-bg" />;
      case 3:
        return <MdSignalWifi3Bar size={20} className="text-bg" />;
      case 4:
        return <MdSignalWifi4Bar size={20} className="text-bg" />;
      default:
        return <MdWifiOff size={20} className="text-bg" />;
    }
  };
  return (
    <NetworkContext.Provider
      value={{ status, isOnline, checkNetwork, setReloadTab }}
    >
      {/* Offline banner */}
      {!isOnline && (
        <div className="bg-red-500 text-white text-center font-bold py-2 absolute top-0 w-full z-50">
          {localization.onlineState.offLine}
        </div>
      )}

      {/* Online but slow connection */}
      {isOnline && speedLevel >= 0 && speedLevel < 4 && (
        <div
          className="absolute flex flex-row px-4 py-2 rounded-xl text-body z-50 items-center gap-2"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            top: 40,
            ...(Right ? { left: 20 } : { right: 20 }),
          }}
        >
          {renderWifiIcon()}
          <span className="text-bg">
            {localization.onlineState.slowConnection}
          </span>
        </div>
      )}

      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
