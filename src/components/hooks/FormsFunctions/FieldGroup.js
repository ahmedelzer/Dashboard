import React, { useCallback, useRef, useState } from "react";
import { Modal, FormCheck } from "react-bootstrap";
import Webcam from "react-webcam";
import { FormGroup, Button, Label } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TextBox from "devextreme-react/text-box";
export default function FieldGroup({ value, onChange, dataError, ...props }) {
  const errorMessages = dataError?.error?.errors?.DashboardCategoryName;
  const style = () => {
    if (errorMessages) {
      return "is-invalid";
    } else {
      return "";
    }
  };
  return (
    <FormGroup>
      <>
        <input
          {...props}
          value={value}
          onChange={onChange}
          className={`${style()} form-control`}
        />
      </>
    </FormGroup>
  );
}
