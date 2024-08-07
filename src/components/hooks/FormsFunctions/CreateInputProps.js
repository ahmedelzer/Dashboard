export function CreateInputProps(param, value) {
  let props = {
    fieldName: param.parameterField,
    title: param.parameterTitel,
    value: value,
    enable: param.isEnable,
    type: param.parameterType,
  };
  if (param.lookupID) {
    const additionProps = {
      lookupDisplayField: param.lookupDisplayField,
      lookupID: param.lookupID,
      lookupReturnField: param.lookupReturnField,
    };
    props = { ...props, ...additionProps };
  }
  return props;
}
