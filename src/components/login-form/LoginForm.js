import React, { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  EmailRule,
} from "devextreme-react/form";
import LoadIndicator from "devextreme-react/load-indicator";
import notify from "devextreme/ui/notify";
import { useAuth } from "../../contexts/auth";
import local from "../../locals/EN/login.json";
import "./LoginForm.scss";
import schema from "./LoginFormSchema.json";
import FormContainer from "../forms/DynamicPopup/FormContainer";
export default function LoginForm() {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  let editedRow = {};
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      console.log("====================================");
      console.log(formJson);
      console.log("====================================");
      // setLoading(true);
      // const result = await signIn(username, password);
      // if (!result.isOk) {
      //   setLoading(false);
      // notify(result.message, "error", 2000);
      // }
    },
    [signIn]
  );
  return (
    <form className={"login-form"} onSubmit={onSubmit}>
      <FormContainer
        row={editedRow}
        tableSchema={schema}
        returnRow={() => {}}
        errorResult={result}
      />
      <Form disabled={loading}>
        <Item
          dataField={local.rememberMe}
          editorType={"dxCheckBox"}
          editorOptions={rememberMeEditorOptions}
        >
          <Label visible={false} />
        </Item>
        <ButtonItem>
          <ButtonOptions
            width={"100%"}
            type={"default"}
            // type={"submit"}
            useSubmitBehavior={true}
          >
            <span className="dx-button-text">
              {loading ? (
                <LoadIndicator width={"24px"} height={"24px"} visible={true} />
              ) : (
                `${local.sign}`
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>
        <Item>
          <div className={"link"}>
            <Link to={"/reset-password"}>{local.forgotPassword}?</Link>
          </div>
        </Item>
      </Form>
    </form>
  );
}

const emailEditorOptions = {
  stylingMode: "filled",
  placeholder: "Email",
  mode: "email",
};
const passwordEditorOptions = {
  stylingMode: "filled",
  placeholder: "Password",
  mode: "password",
};
const rememberMeEditorOptions = {
  text: "Remember me",
  elementAttr: { class: "form-text" },
};
