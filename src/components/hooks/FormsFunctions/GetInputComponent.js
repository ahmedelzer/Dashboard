import {
  BooleanParameter,
  DateParameter,
  DateTimeParameter,
  ImageParameterWithPanelActions,
  LookupInput,
  TextParameter,
} from "../../inputs";
export function GetInputComponent(type) {
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
    case "lookup":
      return LookupInput;
    default:
      return TextParameter;
  }
}
