import { event } from "devextreme/events";
interface InputOnChange {
  KeyName: string;
  KeyValue: any;
  OnChange: (event: Event) => void;
}

export default class TextOnChangeHandling implements InputOnChange {
  KeyName: string;
  KeyValue: any;

  constructor(KeyName: string, KeyValue: any) {
    this.KeyName = KeyName;
    this.KeyValue = KeyValue;
  }

  OnChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    console.log(`New value for ${this.KeyName}: ${inputElement.value}`);
    this.KeyValue = inputElement.value; // Update keyValue with the new input value
  }
}
