import {
  BooleanParameter,
  DateParameter,
  DateTimeParameter,
  ImageParameterWithPanelActions,
  LookupInput,
  TextParameter,
  PasswordParameter,
  LocationMapParameter,
  TimeDuringParameter,
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
    case "password":
      return PasswordParameter;
    case "areaMapLongitudePoint":
      return LocationMapParameter;
    case "timeDuring": //input for days and hours amd minutes then send total minutes
      return TimeDuringParameter;
    case "lookup":
      return LookupInput;
    //detailsCell

    default:
      return TextParameter;
  }
}
