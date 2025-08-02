export const handleWS_Message = (setWSsetMessage,WSMessage) => {
    try {
      console.log("WSMessage:",WSMessage);
      const bufferObj = JSON.parse(WSMessage);
      const byteArray = new Uint8Array(bufferObj.data);
      const urlEncodedString = new TextDecoder().decode(byteArray);
      const decodedString = decodeURIComponent(urlEncodedString);
      setWSsetMessage(() => decodedString);
      console.log("🔔 Incoming message decoded:", decodedString);
    } catch (err) {
      console.error("❌ Failed to decode WebSocket message:", err);
    }
  };