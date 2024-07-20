import React, { useEffect } from "react";

const WebSocketComponent = () => {
  useEffect(() => {
    const uri =
      "ws://ihs.ddnsking.com:8002/Chanels/Ftr:PurchaseInvoice:d8d7bae7-951a-4d17-8dd9-db563513e0f7:e2b6bd4f-a30b-4d70-ae80-f510479a45eb";
    const socket = new WebSocket(uri);

    socket.onopen = () => {
      console.log("Connected to the WebSocket server.");
    };

    socket.onmessage = async (event) => {
      const blob = event.data;
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const jsonData = JSON.stringify(reader.result);
          // const jsonData = reader.result;
          console.log("Received JSON data from server:", jsonData);
          // Handle the received JSON data here
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };

      reader.onerror = (error) => {
        console.error("FileReader error:", error);
      };

      reader.readAsText(blob);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("Connection closed:", event);
    };

    // Clean up the WebSocket connection
    return () => {
      socket.close();
      console.log("Connection closed.");
    };
  }, []); // Run only once on component mount

  return <div>WebSocket Component</div>;
};

export default WebSocketComponent;
