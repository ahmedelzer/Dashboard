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
    let { name, value, setValue } = e?.target;
    const prams = this.tableSchema.dashboardFormSchemaParameters;
    const depend = prams.find((pram) =>
      pram.parameterType.startsWith("depend")
    );
    const menuItemID = prams.find(
      (pram) =>
        pram.dashboardFormSchemaParameterID ===
        "d6435646-9a1a-4a72-b0f4-b1605c3725cb"
    );
    if (depend && setValue) {
      setValue({
        menuItemID: "8cf28545-d1e3-488f-a220-22d95254ab00",
        rate: 5,
        numberOfOrders: 0,
        numberOfReviews: 0,
        numberOfLikes: 0,
        numberOfDislikes: 0,
        itemImage:
          "MenuItemImages\\34a706bf-8bf2-4c45-b660-c247ed177d83.jpg?v4/23/2025 1:06:12 PM",
        publicImage: null,
        menuCategoryName: "Foods",
        menuCategoryID: "b7d65f7f-f87a-4fa6-beaa-d799ba77b9ce",
        menuItemName: "apple",
        menuItemDescription: "dfsdfsds dsgsgsdgsdg sdgsdgsdgdsgsdg",
        preparingTimeAmountPerMinute: 0,
        canReturn: false,
        keywords: "تفاح,apple,apple",
      });
      console.log(name, value, 1122);
      if (name === menuItemID.parameterField) {
        value = "8cf28545-d1e3-488f-a220-22d95254ab00";
        console.log(name, value, "djdjdjj");
      }
      console.log(depend, menuItemID, "depend");
    }
    console.log(this.row, this.specialActions);
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
