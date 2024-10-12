import React, { useCallback, useState } from "react";
import { CheckBox } from "devextreme-react/check-box";
import FormContainer from "./DynamicPopup/FormContainer";
import { Button } from "reactstrap";

const checkedLabel = { "aria-label": "Checked" };
const uncheckedLabel = { "aria-label": "Unchecked" };
const indeterminateLabel = { "aria-label": "Indeterminate" };
const threeStateModeLabel = { "aria-label": "Three state mode" };
const handleValueChangeLabel = { "aria-label": "Handle value change" };
const disabledLabel = { "aria-label": "Disabled" };
const customSizeLabel = { "aria-label": "Custom size" };
const schema = {
  dashboardFormSchemaID: "270f513b-1788-4c01-879e-4526c990f899",
  schemaType: "Login",
  idField: "id",
  dashboardFormSchemaParameters: [
    {
      dashboardFormSchemaParameterID: "38ad2bc8-7d4f-46a5-9a59-8a2104e960f4",
      dashboardFormSchemaID: "270f513b-1788-4c01-879e-4526c990f899",
      isEnable: true,
      parameterType: "password",
      parameterField: "gender",
      parameterTitel: "Gender",
      values: ["female", "Male"],
      isIDField: false,
      lookupID: null,
      lookupReturnField: null,
      lookupDisplayField: null,
      indexNumber: 0,
    },
    {
      dashboardFormSchemaParameterID: "38ad2bc8-7d4f-46a5-9a59-8a2104e960f4",
      dashboardFormSchemaID: "270f513b-1788-4c01-879e-4526c990f899",
      isEnable: true,
      parameterType: "image",
      parameterField: "image",
      parameterTitel: "Image",
      values: ["female", "Male"],
      isIDField: false,
      lookupID: null,
      lookupReturnField: null,
      lookupDisplayField: null,
      indexNumber: 0,
    },
  ],

  isMainSchema: true,
  dataSourceName: null,
  projectProxyRoute: "BrandingMartSecurity",
  propertyName: null,
  indexNumber: 0,
};

function Test() {
  const [checkBoxValue, setCheckBoxValue] = useState(null);
  const onValueChanged = useCallback((args) => {
    setCheckBoxValue(args.value);
  }, []);
  const onApplyChanges = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log("====================================");
    console.log(formJson);
    console.log("====================================");
  };
  return (
    // <div className="form">
    //   <div className="dx-fieldset">
    //     <div className="dx-field">
    //       <div className="dx-field-label">Checked</div>
    //       <div className="dx-field-value">
    //         <CheckBox defaultValue={true} elementAttr={checkedLabel} />
    //       </div>
    //     </div>
    //     <div className="dx-field">
    //       <div className="dx-field-label">Unchecked</div>
    //       <div className="dx-field-value">
    //         <CheckBox defaultValue={false} elementAttr={uncheckedLabel} />
    //       </div>
    //     </div>
    //     <div className="dx-field">
    //       <div className="dx-field-label">Indeterminate</div>
    //       <div className="dx-field-value">
    //         <CheckBox defaultValue={null} elementAttr={indeterminateLabel} />
    //       </div>
    //     </div>
    //     <div className="dx-field">
    //       <div className="dx-field-label">Three state mode</div>
    //       <div className="dx-field-value">
    //         <CheckBox
    //           enableThreeStateBehavior={true}
    //           defaultValue={null}
    //           elementAttr={threeStateModeLabel}
    //         />
    //       </div>
    //     </div>
    //     <div className="dx-field">
    //       <div className="dx-field-label">Handle value change</div>
    //       <div className="dx-field-value">
    //         <CheckBox
    //           value={checkBoxValue}
    //           elementAttr={handleValueChangeLabel}
    //           onValueChanged={onValueChanged}
    //         />
    //       </div>
    //     </div>
    //     <div className="dx-field">
    //       <div className="dx-field-label">Disabled</div>
    //       <div className="dx-field-value">
    //         <CheckBox
    //           disabled={true}
    //           value={checkBoxValue}
    //           elementAttr={disabledLabel}
    //         />
    //       </div>
    //     </div>
    //     <div className="dx-field">
    //       <div className="dx-field-label">Custom size</div>
    //       <div className="dx-field-value">
    //         <CheckBox
    //           defaultValue={null}
    //           iconSize={30}
    //           elementAttr={customSizeLabel}
    //         />
    //       </div>
    //     </div>
    //     <div className="dx-field">
    //       <div className="dx-field-label">With label</div>
    //       <div className="dx-field-value">
    //         <CheckBox defaultValue={true} text="Label" />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <form onSubmit={onApplyChanges} action="">
      <FormContainer tableSchema={schema} row={{}} returnRow={() => {}} />
      <Button type="submit">click</Button>
    </form>
  );
}
export default Test;
