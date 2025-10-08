// LanguageSelector.js
import React, { useContext, useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { LanguageContext } from "../../contexts/Language";
import staticLocalization from "../../contexts/StaticLocalization.json";
import { GetProjectUrl, SetHeaders } from "../../request";
import { buildApiUrl } from "../hooks/APIsFunctions/BuildApiUrl";
import useFetch from "../hooks/APIsFunctions/useFetch";
import UseFetchWithoutBaseUrl from "../hooks/APIsFunctions/UseFetchWithoutBaseUrl";
import LanguageSchemaActions from "../login-form/Schemas/LanguageSchema/LanguageSchemaActions.json";
import LocalizationSchemaActions from "../login-form/Schemas/Localization/LocalizationSchemaActions.json";
import { DeepMerge } from "./deepMerge";
const LanguageSelector = ({ open }) => {
  const [selectedLanguage, SetSelectedLanguage] = useState(null); // or an appropriate default value
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
  const query = React.useMemo(() => dataSourceAPI(getAction), [getAction]);
  const { data } = UseFetchWithoutBaseUrl(query);
  const { setRight, setLocalization, setLan, Right, Lan, setLanguageID } =
    useContext(LanguageContext);

  useEffect(() => {
    if (!Lan || Right === null || !window.localStorage.getItem("languageID")) {
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
    PrepareLanguage(shortName, language);
  };
  function PrepareLanguage(shortName, language) {
    SetSelectedLanguage(shortName);
    setLan(shortName);
    if (language) {
      window.localStorage.setItem("languageID", language.languageID);
      setLanguageID(language.languageID);
      window.localStorage.setItem("language", shortName);
      SetHeaders();
      window.localStorage.setItem("right", language.rightDirectionEnable);
      setRight(language.rightDirectionEnable);
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
    getLocalizationAction?.projectProxyRoute
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
      const marge = DeepMerge(staticLocalization, dataObject);
      setLocalization(marge);

      window.localStorage.setItem("localization", JSON.stringify(marge));
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
