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
  AddingLookupParameter,
  ListOfKeywordsParameter,
  RateParameter,
  BarcodeInput,
  SelectParameter,
  DirectionButtonParameter,
  ButtonInput,
  PolygonMapParameter,
} from "../../inputs";
export function GetInputComponent(type) {
  if (type.startsWith("lookupLocalization:")) {
    return SelectParameter;
  }
  switch (type) {
    case "text":
    case "float":
    case "numeric":
      return TextParameter;
    case "datetime":
    case "localDateTime":
      return DateTimeParameter;
    case "date":
      return DateParameter;
    case "boolean":
      // case "radio button":
      return BooleanParameter;
    case "image":
    case "publicImage":
      return ImageParameterWithPanelActions;
    case "password":
      return PasswordParameter;
    case "areaMapLongitudePoint":
    case "mapLongitudePoint":
      return LocationMapParameter;
    case "timeDuring": //input for days and hours amd minutes then send total minutes
    case "theDurationPerMinuites":
      return TimeDuringParameter;
    case "lookup":
      return LookupInput;
    case "nodeLongitudePoint":
      return DirectionButtonParameter;
    case "drawPolygon":
      return PolygonMapParameter;

    case "scanInput":
      return BarcodeInput;
    case "button":
      return ButtonInput;
    case "addingLookup":
      return AddingLookupParameter; ///addingLookup
    // case "barcodeInput":
    //   return AddingLookupParameter; ///addingLookup
    //detailsCell
    case "listOfKeywords":
      return ListOfKeywordsParameter;
    case "rate":
    case "orders":
    case "reviews":
    case "likes":
    case "dislikes":
      // todo: ActiveInputInde is the first item of these parmters that only appear ignore the others
      return RateParameter;
    default:
      return TextParameter;
  }
}
