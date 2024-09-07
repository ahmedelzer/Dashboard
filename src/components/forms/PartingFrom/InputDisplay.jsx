import React, { useEffect, useState } from "react";
import { FormGroup, Label } from "reactstrap";
import inputs from "../../../locals/EN/inputs.json";
import DisplayErorr from "../../hooks/FormsFunctions/DisplayError";
function InputDisplay({ props, BaseInput, errorResult }) {
  const [inputErrorResult, setInputErrorResult] = useState(errorResult);
  const [title, setTitle] = useState(props.title);
  const [style, setStyle] = useState("");
  const [changed, setChanged] = useState(false);
  const handleChange = (e) => {
    if (inputErrorResult !== errorResult) {
      setChanged(true);
    }
    if (props.onChange) {
      props.onChange(e); // Call the onChange prop if it exists
    }
    setStyle(" ");
  };
  useEffect(() => {
    if (!changed && inputErrorResult !== errorResult) {
      setStyle("is-invalid");
    } else {
      setStyle(" ");
    }
  }, [inputErrorResult, errorResult, changed]);
  return (
    <FormGroup>
      <DisplayErorr
        dataError={errorResult}
        parameterField={props.fieldName}
        setTitle={setTitle}
        setStyle={setStyle}
      />
      <Label for={props.fieldName}>{props.title}</Label>
      <BaseInput
        {...props}
        onChange={handleChange}
        title={props.title}
        placeholder={inputs.base.placeholder + props.title}
        className={style}
      />
      {/* {BaseInput.render()} */}
    </FormGroup>
  );
}

export default InputDisplay;
