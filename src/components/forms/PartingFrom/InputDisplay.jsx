import React, { useEffect, useState } from "react";
import { FormGroup, Label } from "reactstrap";
import useFetch from "../../hooks/APIsFunctions/useFetch";
import GetFormSchema from "../../hooks/DashboardAPIs/GetFormSchema";
import { defaultProjectProxyRoute } from "../../../request";
import DisplayErorr from "../../hooks/FormsFunctions/DisplayError";
import inputs from "../../../locals/EN/inputs.json";
function InputDisplay({ props, BaseInput, errorResult }) {
  const [title, setTitle] = useState(props.title);
  const [style, setStyle] = useState("");
  const [changed, setChanged] = useState(false);
  const handleChange = (e) => {
    if (title !== props.title) {
      // setChanged(true);
    }
    if (props.onChange) {
      props.onChange(e); // Call the onChange prop if it exists
    }
    setStyle(" ");
  };
  useEffect(() => {
    if (title !== props.title && !changed) {
      setStyle("is-invalid");
    } else {
      setStyle(" ");
    }
  }, [title, props.title, changed]);
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
        title={title}
        placeholder={inputs.base.placeholder + props.title}
        className={style}
      />
      {/* {BaseInput.render()} */}
    </FormGroup>
  );
}

export default InputDisplay;
