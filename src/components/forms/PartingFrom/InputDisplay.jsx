import React, { useEffect, useState } from "react";
import { FormGroup, Label } from "reactstrap";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import GetFormSchema from "../../hooks/DashboardAPIs/GetFormSchema";
import { defaultProjectProxyRoute } from "../../../request";
import DisplayErorr from "../../hooks/FormsFunctions/DisplayError";
import inputs from "../../../locals/EN/inputs.json";
//todo
//1: Error handling for inputs
//2: Enter placeholder
function InputDisplay({ props, BaseInput, errorResult }) {
  const [title, setTital] = useState(props.title);
  const [style, setStyle] = useState("");
  const [oldValue, setOldValue] = useState(props.value);
  // const handleFocus = () => {
  //   setStyle((prevClassName) => prevClassName.replace("is-valid", "").trim());
  // };

  useEffect(() => {
    setStyle(style);
  }, [style]);
  return (
    <FormGroup>
      <DisplayErorr
        dataError={errorResult}
        parameterField={props.fieldName}
        setTital={setTital}
        setStyle={setStyle}
      />
      <Label for={props.fieldName}>{props.title}</Label>
      <BaseInput
        {...props}
        title={title}
        placeholder={inputs.base.placeholder + props.title}
        className={style}
      />
    </FormGroup>
  );
}

export default InputDisplay;
