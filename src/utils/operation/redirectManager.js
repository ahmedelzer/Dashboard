class RedirectManager {
  listeners = [];

  set(data) {
    this.listeners.forEach((cb) => cb(data));
  }

  subscribe(cb) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((x) => x !== cb);
    };
  }
}

export const redirectManager = new RedirectManager();
