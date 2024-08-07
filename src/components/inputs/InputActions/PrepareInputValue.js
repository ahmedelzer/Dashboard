import ConvertImageToBase64 from "./ConvertImageToBase64";
export function PrepareInputValue(type, value) {
  if (type !== "file") {
    return value;
  } else {
    return ConvertImageToBase64(value);
  }
}
