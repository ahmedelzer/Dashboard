export function Sm(param) {
  const type = param.parameterType;
  if (param.lookupID) {
    return 12;
  }
  switch (type) {
    case "text":
    case "scanInput":
    case "nodeLongitudePoint":
      return 6;
    case "datetime":
    case "localDateTime":
    case "date":
    case "boolean":
    case "image":
    case "publicImage":
    case "password":
    case "username":
    case "areaMapLongitudePoint":
    case "mapLongitudePoint":
    case "timeDuring": //input for days and hours amd minutes then send total minutes
    case "theDurationPerMinuites":
    case "lookup":
    case "addingLookup":
    case "barcodeInput":
    case "listOfKeywords":
    case "dependLookup":
    case "rate":
    case "orders":
    case "reviews":
    case "likes":
    case "dislikes":
    case "drawPolygon":
    case "linkView":
      // todo: ActiveInputInde is the first item of these parmters that only appear ignore the others
      return 12;
    default:
      return 6;
  }
}
