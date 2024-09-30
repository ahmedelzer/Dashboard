import React, { useContext, useState } from "react";
import { Input, InputGroup, Button } from "reactstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LanguageContext } from "../../contexts/Language";
function PasswordParameter({ ...props }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { Right } = useContext(LanguageContext);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  let { value, enable, title, fieldName } = props;
  return (
    // <>
    <InputGroup dir="ltr">
      <Input
        dir={`${Right ? "rtl" : "ltr"}`}
        required={props.enable}
        defaultValue={value}
        name={fieldName}
        id={fieldName}
        title={title}
        readOnly={!enable}
        {...props}
        type={passwordVisible ? "text" : "password"}
      />
      <Button onClick={togglePasswordVisibility} className="pop">
        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
      </Button>
    </InputGroup>
    // </>
  );
}

export default PasswordParameter;
