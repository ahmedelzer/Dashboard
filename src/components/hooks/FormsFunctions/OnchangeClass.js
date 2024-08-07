import { PrepareInputValue } from "../../inputs/InputActions/PrepareInputValue";

export class Onchange {
  constructor(row, type) {
    this.row = row;
    this.type = type;
  }

  UpdateRow = (e) => {
    const { name, value, type } = e?.target;
    const valueAfterPrepareing = PrepareInputValue(type, value);
    if (this.row[name]) {
      this.row[name] = valueAfterPrepareing;
    } else {
      const newParam = {
        [name]: valueAfterPrepareing,
      };
      this.row = { ...this.row, ...newParam };
    }
    console.log(this.row);

    return this.row;
  };
}
