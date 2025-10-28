import React from "react";
import BaseInput from "./BaseInput";
import { DateBox } from "devextreme-react";
import { loadMessages, locale } from "devextreme/localization";
import { LanguageContext } from "../../contexts/Language";
import { setdateTime } from "../../utils/operation/setdateTime";
const loadLocaleMessages = (dxDateBox) => {
  loadMessages({
    ar: {
      ...dxDateBox,
    },
    en: {
      // Default English values, or customize if necessary
    },
  });
};
class DateTimeParameter extends BaseInput {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const { localization } = this.context;
    // Load the localized messages
    loadLocaleMessages(localization.dateTime.dxDateBox);

    // Get the current language from the <html> tag
    const language = localization.dateTime.dxDateBox ? "ar" : "en";

    // // Set the locale for DevExtreme components
    locale(language);
  }
  getLocalValue() {
    const { value, type } = this.props;

    if (!value) return new Date(); // default current local date/time

    const date = new Date(value);
    // ✅ Proper local time formatting
    if (type === "localDateTime") {
      // Convert UTC to local by using Date() directly (browser auto-adjusts)
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );

      // Optionally use your util if needed
      // return setdateTime(localDate);

      return localDate;
    }

    return date;
  }
  render() {
    const { localization, Right } = this.context;

    const { fieldName, value, onChange, enable, type } = this.props;
    const getValue = () => {
      if (value) {
        if (type === "localDateTime") {
          var date = new Date(value);
          // Format only the time part in local time zone
          var timeString = new Intl.DateTimeFormat(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false, // or true for AM/PM
          }).format(date);
          console.log("====================================");
          console.log(value, timeString, setdateTime(value));
          console.log("====================================");
          return setdateTime(value);
        } else {
          return value;
        }
      } else {
        return Date.now();
      }
    };

    function handleChange(e) {
      const value = e.value;
      onChange({ target: { name: fieldName, value: value } });
    }
    if (!value) {
      handleChange({ value: new Date(value ? value : Date.now()) });
    }
    return (
      <div className="mb-3" title={this.props.title}>
        <DateBox
          value={this.getLocalValue()}
          // value={new Date(getValue())}
          readOnly={!enable}
          title={this.props.title}
          type="datetime"
          name={fieldName}
          key={fieldName}
          onValueChanged={handleChange}
          rtlEnabled={Right}
          applyButtonText={localization.dateTime.applyButtonText}
          cancelButtonText={localization.dateTime.cancelButtonText}
          todayButtonText={localization.dateTime.todayButtonText}
        />
      </div>
    );
  }
}
DateTimeParameter.contextType = LanguageContext;

export default DateTimeParameter;
// import React, { useEffect } from "react";
// import { DateBox } from "devextreme-react";
// import { loadMessages, locale } from "devextreme/localization";

// // Arabic and English translations for months, days, etc.
// const loadLocaleMessages = () => {
//   loadMessages({
//     ar: {
//       dxDateBox: {
//         // Customize the localization messages if necessary
//         months: [
//           "يناير",
//           "فبراير",
//           "مارس",
//           "أبريل",
//           "مايو",
//           "يونيو",
//           "يوليو",
//           "أغسطس",
//           "سبتمبر",
//           "أكتوبر",
//           "نوفمبر",
//           "ديسمبر",
//         ],
//         days: [
//           "الأحد",
//           "الاثنين",
//           "الثلاثاء",
//           "الأربعاء",
//           "الخميس",
//           "الجمعة",
//           "السبت",
//         ],
//         am: "ص",
//         pm: "م",
//         cancel: "dd",
//       },
//     },
//     en: {
//       // Default English values, or customize if necessary
//     },
//   });
// };

// const DateTimeParameter = () => {
//   // Get the current language from the <html> tag
//   const language = "ar";

//   useEffect(() => {
//     // Load the localized messages
//     loadLocaleMessages();

//     // Set the locale for DevExtreme components
//     locale(language);
//   }, [language]);

//   return (
//     <DateBox
//       type="datetime"
//       useMaskBehavior={true}
//       placeholder={
//         language === "ar" ? "اختر التاريخ والوقت" : "Select date and time"
//       }
//       rtlEnabled={language === "ar"} // Enables RTL for Arabic
//       applyButtonText={"ماشى"}
//       cancelButtonText={"ستست"}
//       todayButtonText={"النهارده"}
//     />
//   );
// };

// export default DateTimeParameter;
