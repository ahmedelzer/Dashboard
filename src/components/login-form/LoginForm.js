import Form, {
  ButtonItem,
  ButtonOptions,
  Item,
  Label,
} from "devextreme-react/form";
import LoadIndicator from "devextreme-react/load-indicator";
import notify from "devextreme/ui/notify";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import FormContainer from "../forms/DynamicPopup/FormContainer";
import { onApply } from "../forms/DynamicPopup/OnApplay";
import "./LoginForm.scss";
import schema from "./Schemas/LoginSchema/LoginFormSchema.json";
import schemaActions from "./Schemas/LoginSchema/LoginFormSchemaActions.json";
import { LanguageContext } from "../../contexts/Language";

export default function LoginForm() {
  const { setUser, signIn } = useAuth();
  const { localization } = useContext(LanguageContext);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // Display message if available
  useEffect(() => {
    if (location.state && location.state.message) {
      notify(location.state.message, "error", 2000);
    }
  }, [location.state]);
  const onSubmit = useCallback(
    async (e) => {
      const postAction =
        schemaActions &&
        schemaActions.find(
          (action) => action.dashboardFormActionMethodType === "Post"
        );
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      setLoading(true);
      const apply = await onApply(
        formJson,
        "",
        true,
        postAction,
        schema.projectProxyRoute
      );
      if (apply && apply.success === true) {
        const decodedToken = jwtDecode(apply.data.token);
        const expiresInSeconds = decodedToken.exp;
        const expirationDate = new Date(expiresInSeconds * 1000);
        if (formJson.rememberMe) {
          Cookies.set("user", apply.data.token, { expires: expirationDate });
        } else {
          Cookies.set("user", apply.data.token);
        }
        const user = {
          avatarUrl:
            "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
          ...decodedToken,
        };
        setUser(user);
        window.sessionStorage.setItem(
          "routes",
          user?.UsersGroupDashboardMenuItems
        );
        navigate("/home");
      } else if (!apply.success) {
        setResult(apply);
        // notify(apply.message, "error", 2000);
      }
      setLoading(false);
    },

    [signIn]
  );
  schema.dashboardFormSchemaParameters.map((param) => {
    param.parameterTitel = localization.login[param.parameterField];
  });
  const rememberMeEditorOptions = {
    text: localization.login.rememberMeEditorOptions.text,
    elementAttr: { class: "form-text " },
    "aria-label": "Checked",
  };
  return (
    <form className={"login-form"} onSubmit={onSubmit}>
      <FormContainer
        disabled={loading}
        row={{}}
        tableSchema={schema}
        returnRow={() => {}}
        errorResult={result}
      />
      <Form disabled={loading}>
        <Item
          dataField={"rememberMe"}
          editorType={"dxCheckBox"}
          dir="rtl"
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
                `${localization.login.sign}`
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>
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
  text: "",
  elementAttr: { class: "form-text" },
};
