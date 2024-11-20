import { websocketBaseURI } from "../../../request";
export const socket = (path) => new WebSocket(websocketBaseURI + path);
