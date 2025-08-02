export class WSclass {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.messageCallbacks = []; // Array to store multiple callbacks
    this.connectionCallbacks = [];
  }

  connect(onConnect) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      if (onConnect) onConnect();
      return;
    }

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.connectionCallbacks.forEach((cb) => cb(true));
      if (onConnect) onConnect();
    };

    this.socket.onclose = () => {
      this.connectionCallbacks.forEach((cb) => cb(false));
    };

    this.socket.onmessage = (event) => {
      this.messageCallbacks.forEach((cb) => cb(event.data));
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  addMessageHandler(callback) {
    console.log("this.messageCallbacks", this.messageCallbacks.length);
    if (
      typeof callback === "function" &&
      !this.messageCallbacks.includes(callback)
    ) {
      this.messageCallbacks.push(callback);
    }
    return () => this.removeMessageHandler(callback); // Return cleanup function
  }

  removeMessageHandler(callback) {
    this.messageCallbacks = this.messageCallbacks.filter(
      (cb) => cb !== callback
    );
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.messageCallbacks = [];
      this.connectionCallbacks = [];
    }
  }

  get readyState() {
    return this.socket?.readyState;
  }
}
