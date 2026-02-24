import React, { useContext, useEffect, useState } from "react";
import { Input, Label, FormFeedback } from "reactstrap";
import { LanguageContext } from "../../contexts/Language";

function InstallmentParameter({ ...props }) {
  const { localization } = useContext(LanguageContext);
  const calculateTimes = props.formSchemaParameters.find(
    (pram) => pram.parameterType === "calculateTimes",
  );
  const calculateValue = props.formSchemaParameters.find(
    (pram) => pram.parameterType === "calculateValue",
  );
  const calculateAccatlyValue = props.formSchemaParameters.find(
    (pram) => pram.parameterType === "calculateAccatlyValue",
  );
  const calculateMaxValue = props.formSchemaParameters.find(
    (pram) => pram.parameterType === "calculateMaxValue",
  );
  const calculatedInstallments =
    props.value[calculateMaxValue.parameterField] || 200;
  const [installmentTimes, setInstallmentTimes] = useState(
    props.value[calculateTimes.parameterField],
  );
  const [installmentPayment, setInstallmentPayment] = useState(
    props.value[calculateValue.parameterField],
  );
  const [isInvalid, setIsInvalid] = useState(false);

  let { value, enable, title, fieldName } = props;

  useEffect(() => {
    if (value) {
      try {
        const parsed = typeof value === "string" ? JSON.parse(value) : value;

        setInstallmentTimes(props.value[calculateTimes.parameterField] || 0);
        setInstallmentPayment(props.value[calculateValue.parameterField] || 0);
      } catch {
        console.warn("Invalid installment value format");
      }
    }
  }, [value]);

  // Calculate total
  const installmentsTotal =
    (Number(installmentTimes) || 0) * (Number(installmentPayment) || 0) +
    (Number(props.value[calculateAccatlyValue.parameterField]) || 0);

  // Validation
  useEffect(() => {
    if (installmentsTotal > calculatedInstallments) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [installmentsTotal]);
  const className = `${props.className} form-control`;

  return (
    <div className="flex flex-row space-x-4">
      {/* Installment Times */}
      <div>
        <Label className="whitespace-nowrap">
          {calculateTimes?.parameterTitel}
        </Label>
        <Input
          type="number"
          min="0"
          value={installmentTimes}
          onChange={(e) => setInstallmentTimes(e.target.value)}
          className={className}
          name={calculateTimes.parameterField}
          title={title}
        />
      </div>

      {/* Payment */}
      <div>
        <Label className="whitespace-nowrap">
          {calculateValue?.parameterTitel}
        </Label>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={installmentPayment}
          onChange={(e) => setInstallmentPayment(e.target.value)}
          className={className}
          name={calculateValue.parameterField}
          title={title}
        />
      </div>

      {/* Total */}
      <div>
        <Label className="whitespace-nowrap">
          {calculateMaxValue?.parameterTitel}
        </Label>

        <Input
          type="number"
          value={installmentsTotal}
          readOnly
          max={calculatedInstallments}
          invalid={isInvalid}
          name={calculateMaxValue.parameterField}
          className={className}
        />

        {isInvalid && (
          <FormFeedback>
            {localization?.inputs?.installment?.maxHint ||
              `Total cannot exceed ${calculatedInstallments}`}
          </FormFeedback>
        )}

        {!isInvalid && calculatedInstallments && (
          <small className="text-muted">
            {`${localization?.inputs?.installment?.maximum} ${calculatedInstallments}`}
          </small>
        )}
      </div>
    </div>
  );
}

export default InstallmentParameter;
