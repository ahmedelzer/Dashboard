import { websoketBaseURI } from "../../../request";
export const socket = (path) => new WebSocket(websoketBaseURI + path);
