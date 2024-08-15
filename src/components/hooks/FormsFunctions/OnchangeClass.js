import { PrepareInputValue } from "../../inputs/InputActions/PrepareInputValue";

export class Onchange {
  constructor(row) {
    this.row = row;
  }

  ReturnRow = () => {
    // Use an arrow function to ensure correct `this` binding
    return this.row;
  };
  UpdateRow = async (e) => {
    const { name, value, type } = e?.target;

    // Assuming PrepareInputValue is an asynchronous function you have defined elsewhere
    const valueAfterPreparing = await PrepareInputValue(type, value);

    if (this.row[name]) {
      this.row[name] = valueAfterPreparing;
    } else {
      const newParam = { [name]: valueAfterPreparing };
      this.row = { ...this.row, ...newParam };
    }
    console.log(this.row);

    return this.row;
  };
}
