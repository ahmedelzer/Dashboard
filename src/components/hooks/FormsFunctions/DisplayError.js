function DisplayError({ dataError, parameterField, setTitle }) {
  const fieldLowercase = parameterField?.toLowerCase();
  let errors = dataError?.error?.errors;
  const lowercaseError = {};
  for (const [k, v] of Object.entries(errors ? errors : {})) {
    lowercaseError[k.toLowerCase()] = v;
  }
  if (dataError && dataError.success === false) {
    const errorMessages = lowercaseError[fieldLowercase];
    if (errorMessages && errorMessages.length > 0) {
      setTitle(`${errorMessages}`);
      // setStyle("is-invalid");
    }
  }
  return null;
}

export default DisplayError;
