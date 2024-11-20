import React, { useContext, useState } from "react";
import { Input, Label } from "reactstrap";
import { LanguageContext } from "../../contexts/Language";

function TimeDuringParameter({ ...props }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const { localization } = useContext(LanguageContext);

  const handleDaysChange = (e) => {
    setDays(e.target.value);
  };

  const handleHoursChange = (e) => {
    setHours(e.target.value);
  };

  const handleMinutesChange = (e) => {
    setMinutes(e.target.value);
  };
  let { value, enable, title, fieldName, type } = props;
  const className = `${props.className} form-control`;
  // Calculate total time in minutes
  const totalMinutes =
    (parseInt(days, 10) || 0) * 1440 +
    (parseInt(hours, 10) || 0) * 60 +
    (parseInt(minutes, 10) || 0);
  return (
    <div className="flex space-x-4">
      <div>
        <Label
          htmlFor="days"
          //   className="block text-sm font-medium text-gray-700"
        >
          {localization.inputs.timeDuring.labelDays}
        </Label>
        <Input
          type="number"
          id="days"
          value={days}
          onChange={handleDaysChange}
          //   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          min="0"
          max={"999"}
          className={className}
          title={title}
        />
      </div>
      <div>
        <Label
          htmlFor="hours"
          //   className="block text-sm font-medium text-gray-700"
        >
          {localization.inputs.timeDuring.labelHours}
        </Label>
        <Input
          type="number"
          id="hours"
          value={hours}
          onChange={handleHoursChange}
          //   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          min="0"
          className={className}
          title={title}
          max={"23"}
        />
      </div>
      <div>
        <Label
          htmlFor="minutes"
          //   className="block text-sm font-medium text-gray-700"
        >
          {localization.inputs.timeDuring.labelMinutes}
        </Label>
        <Input
          type="number"
          id="minutes"
          value={minutes}
          onChange={handleMinutesChange}
          //   className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          min="0"
          max={"59"}
          className={className}
          title={title}
        />
      </div>
      <input
        type="hidden"
        value={totalMinutes}
        required={enable}
        defaultValue={value}
        name={fieldName}
        id={fieldName}
        title={title}
        readOnly={!enable}
      />
    </div>
  );
}

export default TimeDuringParameter;
