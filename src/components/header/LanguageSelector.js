// LanguageSelector.js
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hooks/APIsFunctions/useFetch";
import { LanguageContext } from "../../contexts/Language";
import { GetProjectUrl, SetReoute } from "../../request";
import schemaLanguages from "../login-form/Schemas/LanguageSchema/LanguageSchema.json";
import LanguageSchemaActions from "../login-form/Schemas/LanguageSchema/LanguageSchemaActions.json";
import LocalizationSchemaActions from "../login-form/Schemas/Localization/LocalizationSchemaActions.json";
import { buildApiUrl } from "../hooks/APIsFunctions/BuildApiUrl";
import UseFetchWithoutBaseUrl from "../hooks/APIsFunctions/UseFetchWithoutBaseUrl";
function PrepareLanguage(
  selectedLanguageObject,
  selectedLanguage,
  dataLocals,
  setLan,
  setRight,
  setLocalization
) {
  if (selectedLanguageObject) {
    setLan(selectedLanguage);
    setRight(selectedLanguageObject.rightDirectionEnable);
    // Replace ObjectId(...) with just the ID string in dataLocals
    const formattedDataLocals = dataLocals.replace(
      /ObjectId\("([^"]+)"\)/g,
      '"$1"'
    );

    // Parse the formatted string into a JavaScript object
    const dataObject = JSON.parse(formattedDataLocals);

    // Remove the _id property if it exists
    delete dataObject._id;

    // Set the localization state with the updated object
    setLocalization(dataObject);

    // Store the updated object back to localStorage
    window.localStorage.setItem("localization", JSON.stringify(dataObject));

    window.localStorage.setItem(
      "right",
      selectedLanguageObject.rightDirectionEnable
    );
    window.localStorage.setItem(
      "languageID",
      selectedLanguageObject.languageId
    );
    window.localStorage.setItem("language", selectedLanguage);
  }
}
const LanguageSelector = () => {
  SetReoute(schemaLanguages.projectProxyRoute);
  const { setRight, setLocalization, setLan } = useContext(LanguageContext);
  const dataSourceAPI = (query) =>
    buildApiUrl(query, {
      pageIndex: 1,
      pageSize: 1000,
      activeStatus: 1,
    });
  const getAction =
    LanguageSchemaActions &&
    LanguageSchemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );
  const query = dataSourceAPI(getAction);
  const { data } = UseFetchWithoutBaseUrl(query);
  const selectedLanguage = data?.dataSource[0]?.shortName;
  const selectedLanguageObject = data?.dataSource?.find(
    (language) => language.shortName === selectedLanguage
  );
  // local
  const getLocalizationAction =
    LocalizationSchemaActions &&
    LocalizationSchemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );
  // getLocalizationAction that objev
  const { data: dataLocals } = useFetch(
    "/" +
      getLocalizationAction.routeAdderss +
      "/" +
      window.localStorage.getItem("language"),
    GetProjectUrl()
  );
  useEffect(() => {
    PrepareLanguage(
      selectedLanguageObject,
      selectedLanguage,
      dataLocals,
      setLan,
      setRight,
      setLocalization
    );
  });

  const changeLanguage = (e) => {
    const selectedLanguage = e.target.value;
    const selectedLanguageObject = data?.dataSource?.find(
      (language) => language.shortName === selectedLanguage
    );
    PrepareLanguage(
      selectedLanguageObject,
      selectedLanguage,
      dataLocals,
      setLan,
      setRight,
      setLocalization
    );
  };

  return (
    <div className="circle-container">
      <select
        id="languageSelect"
        className="uppercase text-xs color !cursor-pointer"
        onChange={changeLanguage}
      >
        {data?.dataSource?.map((name) => (
          <option
            value={name.shortName}
            // onClick={() => setLan(`${name.shortName}`)}
            key={name.shortName}
          >
            {name.shortName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
