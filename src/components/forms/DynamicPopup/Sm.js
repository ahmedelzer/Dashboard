export function Sm(param) {
  if (param.lookupID !== null) {
    return 12;
  } else if (param.parameterType !== "text") {
    return 12;
  } else return 6;
}
