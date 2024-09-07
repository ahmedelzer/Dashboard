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
  setLan,
  setRight,
  setLocalization
) {
  const getLocalizationAction =
    LocalizationSchemaActions &&
    LocalizationSchemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );
  const { data: dataLocals } = useFetch(
    "/" +
      getLocalizationAction.routeAdderss +
      "/" +
      window.localStorage.getItem("language"),
    GetProjectUrl()
  );
  if (selectedLanguageObject) {
    const localFormat = dataLocals?.replace(/ObjectId\("([^"]+)"\)/g, '"$1"');

    // Parse the formatted string into a JavaScript object
    const dataObject = JSON.parse(localFormat);
    delete dataObject._id;
    // console.log(
    //   "Preparing1",
    //   typeof dataObject,
    //   localFormat,
    //   typeof dataLocals
    // );
    // Set the localization state with the updated object

    // Store the updated object back to localStorage
    setLocalization(dataObject);
    window.localStorage.removeItem("localization");

    window.localStorage.setItem("localization", JSON.stringify(dataObject));

    return true;
  }
}

const LanguageSelector = (inti) => {
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
  setLan(selectedLanguage);
  useEffect(() => {
    if (selectedLanguageObject) {
      setRight(selectedLanguageObject.rightDirectionEnable);
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
  }, [selectedLanguageObject]);

  // local
  const result = PrepareLanguage(
    selectedLanguageObject,
    selectedLanguage,
    setLan,
    setRight,
    setLocalization
  );

  const changeLanguage = (e) => {
    const selectedLanguage = e.target.value;
    const selectedLanguageObject = data?.dataSource?.find(
      (language) => language.shortName === selectedLanguage
    );
    PrepareLanguage(
      selectedLanguageObject,
      selectedLanguage,
      setLan,
      setRight,
      setLocalization
    );
  };
  useEffect(() => {
    console.log("language fired");
  }, [inti]);

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
