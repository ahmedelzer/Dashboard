import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
export default function FieldGroup({ value, onChange, ...props }) {
  // const style = () => {
  //   if (props.title) {
  //     return "is-invalid";
  //   } else {
  //     return "";
  //   }
  // };

  return (
    <input
      {...props}
      onChange={onChange}
      onFocus={props.onFocus}
      className={`${props.className} form-control`}
    />
  );
}
