import { socket } from "../../components/hooks/APIsFunctions/WebsocketClient";

export class WSClient {
  constructor(url) {
    this.url = url;
    this.socket = null;
  }

  connect() {
    this.socket = socket(this.url);

    this.socket.onopen = () => {
      console.log("Connected to server");
    };

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
  recriveMessage(event, getAction, state, schema) {
    const data = JSON.parse(event.data);
    if (data) {
      switch (data.operation) {
        case "Insert": {
          state.rows = [...state.rows, ...data[getAction.returnPropertyName]];
          break;
        }
        case "Update": {
          let updata = state.rows.find(
            (row) => row[schema.idField] === data[getAction.returnPropertyName]
          );
          updata = data;
          break;
        }
        case "Delete": {
          let Delete = state.rows.find(
            (row) => row[schema.idField] === data[getAction.returnPropertyName]
          );
          Delete = null;
          break;
        }
        case "Fill": {
          state.rows = data[getAction.returnPropertyName];

          break;
        }
        default: {
          return null;
        }
      }
    }
  }
  disconnect() {
    if (this.socket) {
      this.socket.close();
      console.log("Disconnected from server");
    }
  }
}
