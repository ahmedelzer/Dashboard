// WSMessageHandler.ts
import { WSOperation } from "./WSOperation";

// WSMessageHandler.js
export class WSMessageHandler {
  constructor({
    _WSsetMessage,
    fieldsType,
    rows,
    totalCount,
    callbackReducerUpdate,
  }) {
    this._WSsetMessage = _WSsetMessage;
    this.fieldsType = fieldsType;
    this.rows = rows;
    this.totalCount = totalCount;
    this.callbackReducerUpdate = callbackReducerUpdate;
  }

  process() {
    if (!this._WSsetMessage) return;

    console.log("📩 WS message received, processing...");
    const parsed = JSON.parse(this._WSsetMessage);
    console.log(1111, this.fieldsType, parsed);

    if (!parsed[this.fieldsType.dataSourceName]) return;

    try {
      //console.log("WSMessageHandler",newRows,this.fieldsType.idField,this.fieldsType.dataSourceName);
      const ws_updatedRows = WSOperation(
        this._WSsetMessage,
        () => {},
        () => {},
        this.fieldsType.idField,
        this.fieldsType.dataSourceName,
        this.rows,
        this.totalCount
      );
      console.log("ws_updatedRows", ws_updatedRows);
      //console.log("✅ ws_updatedRows", ws_updatedRows);

      // if (ws_updatedRows?.rows?.length > 0) {
      //   console.log("after ws_updatedRows");
      //   this.callbackReducerUpdate(ws_updatedRows);
      // }
      this.callbackReducerUpdate(ws_updatedRows);
    } catch (e) {
      console.error("❌ WS message processing failed", e);
    }
  }
}
