export function WSOperation(message, prvMessages, callback) {
  switch (message.ope) {
    case "Insert": {
      //   state.rows = [...state.rows, ...data[getAction.returnPropertyName]];
      callback([...prvMessages, message]);
      break;
    }
    case "context": {
      //   state.rows = [...state.rows, ...data[getAction.returnPropertyName]];
      callback();
      break;
    }
    case "Update": {
      //   let updata = state.rows.find(
      //     (row) => row[schema.idField] === data[getAction.returnPropertyName]
      //   );
      //   updata = data;
      break;
    }
    case "Delete": {
      //   let Delete = state.rows.find(
      //     (row) => row[schema.idField] === data[getAction.returnPropertyName]
      //   );
      //   Delete = null;
      break;
    }
    case "Fill": {
      //   state.rows = data[getAction.returnPropertyName];

      break;
    }
    default: {
      return null;
    }
  }
}
