// LanguageSelector.js
import React, { useContext, useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { LanguageContext } from "../../contexts/Language";
import { GetProjectUrl, SetReoute } from "../../request";
import { buildApiUrl } from "../hooks/APIsFunctions/BuildApiUrl";
import useFetch from "../hooks/APIsFunctions/useFetch";
import UseFetchWithoutBaseUrl from "../hooks/APIsFunctions/UseFetchWithoutBaseUrl";
import schemaLanguages from "../login-form/Schemas/LanguageSchema/LanguageSchema.json";
import LanguageSchemaActions from "../login-form/Schemas/LanguageSchema/LanguageSchemaActions.json";
import LocalizationSchemaActions from "../login-form/Schemas/Localization/LocalizationSchemaActions.json";
const LanguageSelector = ({ open }) => {
  const [selectedLanguage, SetSelectedLanguage] = useState(null); // or an appropriate default value
  SetReoute(schemaLanguages.projectProxyRoute);
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
  const { setRight, setLocalization, setLan, Right, Lan } =
    useContext(LanguageContext);

  useEffect(() => {
    if (
      !Lan ||
      Right === null ||
      !window.localStorage.getItem("localization") ||
      !window.localStorage.getItem("languageID")
    ) {
      const shortName = data?.dataSource[0]?.shortName;

      const language = data?.dataSource?.find(
        (language) => language.shortName === shortName
      );
      SetSelectedLanguage(shortName);
      PrepareLanguage(shortName, language);
    } else {
      SetSelectedLanguage(window.localStorage.getItem("language")); // Set the state from localStorage
    }
  }, [data]);

  const changeLanguage = (e) => {
    const shortName = e.target.value;
    const language = data?.dataSource?.find(
      (language) => language.shortName === shortName
    );
    SetSelectedLanguage(shortName);
    window.localStorage.setItem("language", shortName);

    PrepareLanguage(shortName, language);
  };
  function PrepareLanguage(shortName, language) {
    SetSelectedLanguage(shortName);
    setLan(shortName);
    if (language) {
      setRight(language.rightDirectionEnable);
      window.localStorage.setItem("right", language.rightDirectionEnable);
      window.localStorage.setItem("languageID", language.languageID);
      window.localStorage.setItem("language", shortName);
    }
  }
  //localization
  const getLocalizationAction = LocalizationSchemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "Get"
  );

  // Using useFetch hook to fetch data
  const language = selectedLanguage || window.localStorage.getItem("language");
  const { data: localization } = useFetch(
    `/${getLocalizationAction?.routeAdderss}/${language}`,
    GetProjectUrl()
  );

  useEffect(() => {
    if (localization) {
      const localFormat = localization?.replace(
        /ObjectId\("([^"]+)"\)/g,
        '"$1"'
      );

      // Parse the formatted string into a JavaScript object
      const dataObject = JSON.parse(localFormat);
      delete dataObject._id;
      setLocalization(dataObject);
      // window.localStorage.removeItem("localization");

      window.localStorage.setItem("localization", JSON.stringify(dataObject));
    }
  }, [localization, setLocalization]);
  return (
    <>
      {open ? (
        <div className="circle-container">
          <select
            id="languageSelect"
            className="uppercase text-xs color !cursor-pointer"
            value={language} // Set the selected language here
            onChange={changeLanguage}
          >
            {data?.dataSource?.map((name) => (
              <option value={name.shortName} key={name.shortName}>
                {name.shortName}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="flex justify-content-end align-items-center">
          <BiWorld size={30} className="color" />
        </div>
      )}
    </>
  );
};

export default LanguageSelector;
