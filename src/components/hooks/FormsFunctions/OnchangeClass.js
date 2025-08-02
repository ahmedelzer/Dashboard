import {
  onApply,
  onApplyWithSpecialAction,
} from "../../forms/DynamicPopup/OnApplay";
import { PrepareInputValue } from "../../inputs/InputActions/PrepareInputValue";

export class Onchange {
  constructor(specialActions, proxyRoute, row, tableSchema) {
    this.specialActions = specialActions;
    this.row = row;
    this.proxyRoute = proxyRoute;
    this.tableSchema = tableSchema;
  }

  ReturnRow = () => {
    // Use an arrow function to ensure correct `this` binding
    return this.row;
  };
  UpdateRow = async (e) => {
    let { name, value, type } = e?.target;
    console.log(this.ReturnRow(), "onchange");

    const params = this.tableSchema.dashboardFormSchemaParameters;
    const dependParam = params.find((pram) =>
      pram.parameterType.startsWith("depend")
    );
    // Get the dependency IDs from that parameter
    const dependencyIDs =
      dependParam?.dashboardFormSchemaParameterDependencies?.map(
        (dep) => dep.dependDashboardFormSchemaParameterID
      ) || [];

    // Get the actual parameter objects that match those dependency IDs
    const dependItems = params.filter((param) =>
      dependencyIDs.includes(param.dashboardFormSchemaParameterID)
    );
    if (dependParam) {
      if (name === dependParam.parameterField) {
        //add here in the tableSchema in objs of dependItems new proparty key and value change the value
        dependItems.forEach((item) => {
          // Find the actual item reference in tableSchema and update it
          const originalItem = params.find(
            (p) =>
              p.dashboardFormSchemaParameterID ===
              item.dashboardFormSchemaParameterID
          );
          if (originalItem) {
            originalItem["key"] = value; // <-- Set the new property and value
          }
        });
      }
      console.log(dependItems, "dependItems", name, dependParam.parameterField);
    }
    console.log(this.row, this.specialActions);
    const specialAction = this.specialActions?.find((action) =>
      action.dashboardFormActionMethodType.endsWith(name)
    );

    // if (specialAction && value && name) {
    //   console.log(`${specialAction.routeAdderss}/1233`);
    //   const apply = await onApplyWithSpecialAction(
    //     value,
    //     "",
    //     specialAction.dashboardFormActionMethodType.split(":")[0],
    //     `${specialAction.routeAdderss}/1233`,
    //     this.proxyRoute
    //     // proxyRoute
    //   );
    //   console.log(apply);
    // }

    // // Assuming PrepareInputValue is an asynchronous function you have defined elsewhere
    const valueAfterPreparing = await PrepareInputValue(type, value);

    if (this.row[name]) {
      this.row[name] = valueAfterPreparing;
    } else {
      const newParam = { [name]: valueAfterPreparing };
      this.row = { ...this.row, ...newParam };
    }

    return this.row;
  };
}
