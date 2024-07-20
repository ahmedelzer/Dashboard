import { useEffect } from "react";

export class WSclass {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.socket = new WebSocket(this.url);
  }

  connect() {
    console.log("connect", "conecting");

    this.socket.onopen = (e) => {
      console.log("Connected to server", e);
    };
    console.log("====================================");

    this.socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      // You can handle the received message here
    };

    this.socket.onclose = (event) => {
      console.log("Connection closed:", event);
      // You can handle the connection closed event here
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      // You can handle WebSocket errors here
    };
  }
  ReciveMessages(messageCallback) {
    this.socket.addEventListener("message", (event) => {
      const blob = event.data;
      // const reader = new FileReader();
      messageCallback(JSON.parse(blob));
      // reader.onload = () => {
      //   try {
      //     const jsonData = JSON.parse(reader.result);
      //     // const cleanedData = jsonData
      //     //   .replace(/ObjectId\("[a-f0-9-]+"\)/g, '"SampleObjectId"')
      //     //   .replace(/CSUUID\("[a-f0-9-]+"\)/g, '"SampleCSUUID"')
      //     //   .replace(/ISODate\("[0-9TZ:.+-]+"?\)/g, '"SampleISODate"');
      //     // Call the messageCallback with the received JSON data

      //     messageCallback(jsonData);
      //   } catch (error) {
      //     console.error("Error parsing JSON:", error);
      //   }
      // };

      // reader.onerror = (error) => {
      //   console.error("FileReader error:", error);
      // };

      // reader.readAsText(blob);
    });

    // Return a function to clean up the WebSocket connection
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      console.log("Disconnected from server");
    }
  }
}
