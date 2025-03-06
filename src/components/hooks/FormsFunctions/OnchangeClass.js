import {
  onApply,
  onApplyWithSpecialAction,
} from "../../forms/DynamicPopup/OnApplay";
import { PrepareInputValue } from "../../inputs/InputActions/PrepareInputValue";

export class Onchange {
  constructor(specialActions, proxyRoute, row) {
    this.specialActions = specialActions;
    this.row = row;
    this.proxyRoute = proxyRoute;
  }

  ReturnRow = () => {
    // Use an arrow function to ensure correct `this` binding
    return this.row;
  };
  UpdateRow = async (e) => {
    const { name, value } = e?.target;
    console.log(this.proxyRoute);
    const specialAction = this.specialActions?.find((action) =>
      action.dashboardFormActionMethodType.endsWith(name)
    );

    if (specialAction && value && name) {
      console.log(`${specialAction.routeAdderss}/1233`);
      const apply = await onApplyWithSpecialAction(
        value,
        "",
        specialAction.dashboardFormActionMethodType.split(":")[0],
        `${specialAction.routeAdderss}/1233`,
        this.proxyRoute
        // proxyRoute
      );
      console.log(apply);
    }

    // // Assuming PrepareInputValue is an asynchronous function you have defined elsewhere
    // const valueAfterPreparing = await PrepareInputValue(type, value);

    // if (this.row[name]) {
    //   this.row[name] = valueAfterPreparing;
    // } else {
    //   const newParam = { [name]: valueAfterPreparing };
    //   this.row = { ...this.row, ...newParam };
    // }

    return this.row;
  };
}
