import React, { useContext, useEffect, useState } from "react";
import { Input } from "reactstrap";
import { LanguageContext } from "../../contexts/Language";
import LocationButton from "../../utils/components/LocationButton";

function DirectionButtonParameter({
  value,
  enable,
  title,
  fieldName,
  returnField,
  displayField,
  formSchemaParameters,
  ...props
}) {
  const GetOwnLocation = () => {
    const key = fieldName.split("LongitudePoint")[0];
    const latFiledName = formSchemaParameters.find(
      (param) => param.parameterField === `${key}LatitudePoint`
    ).parameterField;
    console.log("====================================");
    console.log(key, { lat: value[latFiledName], long: value[fieldName] });
    console.log("====================================");
    return { lat: value[latFiledName], long: value[fieldName] };
  };
  const { lat, long } = GetOwnLocation();
  return <LocationButton latitude={lat} longitude={long} />;
}

export default DirectionButtonParameter;
