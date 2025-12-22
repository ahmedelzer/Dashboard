export const handleWS_Message = (setWSsetMessage, WSMessage) => {
  try {
    const bufferObj = JSON.parse(WSMessage);
    const byteArray = new Uint8Array(bufferObj.data);
    const urlEncodedString = new TextDecoder().decode(byteArray);
    const decodedString = decodeURIComponent(urlEncodedString);
    setWSsetMessage(() => decodedString);
  } catch (err) {
    console.error("❌ Failed to decode WebSocket message:", err);
  }
};
