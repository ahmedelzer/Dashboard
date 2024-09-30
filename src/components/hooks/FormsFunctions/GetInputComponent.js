import {
  BooleanParameter,
  DateParameter,
  DateTimeParameter,
  ImageParameterWithPanelActions,
  LookupInput,
  TextParameter,
  PasswordParameter,
} from "../../inputs";
export function GetInputComponent(type) {
  // console.log(type);

  switch (type) {
    case "text" || "float" || "numeric":
      return TextParameter;
    case "datetime":
      return DateTimeParameter;
    case "date":
      return DateParameter;
    case "boolean":
      return BooleanParameter;
    case "image":
      return ImageParameterWithPanelActions;
    case "password":
      return PasswordParameter;
    case "lookup":
      return LookupInput;
    //detailsCell

    default:
      return TextParameter;
  }
}
