export class WSclass {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.shouldReconnect = true;
    this.reconnectInterval = 2000; // 2 seconds
    this.reconnectTimeout = null;
    this.messageCallbacks = [];
    this.connectionCallbacks = [];
  }

  connect(onConnect) {
    // Avoid duplicate open connections
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      if (onConnect) onConnect();
      return;
    }

    // Clear any previous reconnect timeout
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      //console.log("✅ WebSocket connected:", this.url);
      this.connectionCallbacks.forEach((cb) => cb(true));
      if (onConnect) onConnect();
    };

    this.socket.onclose = () => {
      //console.warn("⚠️ WebSocket closed:", this.url);
      this.connectionCallbacks.forEach((cb) => cb(false));

      if (this.shouldReconnect) {
        // console.log(
        //   `🔁 Attempting to reconnect in ${this.reconnectInterval / 1000}s...`
        // );
        this.reconnectTimeout = setTimeout(() => {
          this.connect(onConnect);
        }, this.reconnectInterval);
      }
    };

    this.socket.onmessage = (event) => {
      this.messageCallbacks.forEach((cb) => cb(event.data));
    };

    this.socket.onerror = (error) => {
     // console.error("WebSocket error:", error);
      this.socket.close(); // triggers onclose → reconnect
    };
  }

  addMessageHandler(callback) {
    if (
      typeof callback === "function" &&
      !this.messageCallbacks.includes(callback)
    ) {
      this.messageCallbacks.push(callback);
    }
    return () => this.removeMessageHandler(callback);
  }

  removeMessageHandler(callback) {
    this.messageCallbacks = this.messageCallbacks.filter(
      (cb) => cb !== callback
    );
  }

  addConnectionHandler(callback) {
    if (
      typeof callback === "function" &&
      !this.connectionCallbacks.includes(callback)
    ) {
      this.connectionCallbacks.push(callback);
    }
    return () => this.removeConnectionHandler(callback);
  }

  removeConnectionHandler(callback) {
    this.connectionCallbacks = this.connectionCallbacks.filter(
      (cb) => cb !== callback
    );
  }

  disconnect() {
    // this.shouldReconnect = false;
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.messageCallbacks = [];
    this.connectionCallbacks = [];
  }

  get readyState() {
    return this.socket?.readyState;
  }
}
