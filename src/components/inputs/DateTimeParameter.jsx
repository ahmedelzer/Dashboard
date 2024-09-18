import React from "react";
import BaseInput from "./BaseInput";
import { DateBox } from "devextreme-react";
import { loadMessages, locale } from "devextreme/localization";
import { LanguageContext } from "../../contexts/Language";
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
  render() {
    const { localization, Right } = this.context;

    const { fieldName, value, onChange, enable } = this.props;
    function handleChange(e) {
      const value = e.value;
      onChange({ target: { name: fieldName, value: value } });
    }
    handleChange({ value: new Date(value ? value : Date.now()) });
    return (
      <div className="mb-3" title={this.props.title}>
        <DateBox
          value={new Date(value ? value : Date.now())}
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
