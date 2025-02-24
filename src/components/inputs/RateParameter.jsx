import React from "react";
import { GetIconByName } from "../../utils/GetIconByName";
import firstColsFound from "../forms/DynamicPopup/firstColsFound.json";
function RateParameter({ ...props }) {
  return (
    <div className="flex justify-between items-center">
      {props.formSchemaParameters
        .filter((i) => firstColsFound.includes(i.parameterType))
        .map((pram) => (
          <div
            className="flex items-center"
            key={pram.dashboardFormSchemaParameterID}
            title={pram.parameterTitel}
          >
            <p className="!mx-1 m-0 !p-0 text-md">
              {props.value[pram.parameterType]}
            </p>
            <div className="text-accent">
              {GetIconByName(pram.parameterType, 22)}
            </div>
          </div>
        ))}
    </div>
  );
}

export default RateParameter;
