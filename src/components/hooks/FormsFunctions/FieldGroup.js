import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Input } from "reactstrap";
export default function FieldGroup({ value, onChange, ...props }) {
  // const style = () => {
  //   if (props.title) {
  //     return "is-invalid";
  //   } else {
  //     return "";
  //   }
  // };

  return (
    <Input
      {...props}
      onChange={onChange}
      onFocus={props.onFocus}
      min={props.type === "number" ? 0 : undefined}
      className={`${props.className} form-control`}
    />
  );
}
