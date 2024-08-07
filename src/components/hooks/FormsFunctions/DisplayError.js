function DisplayError({ dataError, parameterField, setTital, setStyle }) {
  const fieldLowercase = parameterField?.toLowerCase();
  let errors = dataError?.error?.errors;
  const lowercaseError = {};
  for (const [k, v] of Object.entries(errors ? errors : {})) {
    lowercaseError[k.toLowerCase()] = v;
  }
  if (dataError && dataError.success === false) {
    const errorMessages = lowercaseError[fieldLowercase];
    setTital(`${errorMessages}`);
    if (errorMessages && errorMessages.length > 0) {
      setStyle("is-invalid");
      return null;
    }
  }
  return null;
}

export default DisplayError;
