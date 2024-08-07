import React, { useCallback, useRef, useState } from "react";
import { Modal, FormCheck } from "react-bootstrap";
import Webcam from "react-webcam";
import { FormGroup, Button, Label } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TextBox from "devextreme-react/text-box";
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
      value={value}
      onChange={onChange}
      onFocus={props.onFocus}
      className={`${props.className} form-control`}
    />
  );
}
