// LanguageSelector.js
import React, { useContext, useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { LanguageContext } from "../../contexts/Language";
import { GetProjectUrl, SetReoute } from "../../request";
import { buildApiUrl } from "../hooks/APIsFunctions/BuildApiUrl";
import UseFetchWithoutBaseUrl from "../hooks/APIsFunctions/UseFetchWithoutBaseUrl";
import schemaLanguages from "../login-form/Schemas/LanguageSchema/LanguageSchema.json";
import LanguageSchemaActions from "../login-form/Schemas/LanguageSchema/LanguageSchemaActions.json";
import { FetchLocalizationData } from "./FetchLocalizationData";
import useFetch from "../hooks/APIsFunctions/useFetch";
import LocalizationSchemaActions from "../login-form/Schemas/Localization/LocalizationSchemaActions.json";
//todo: the last point is in localization take language name correctly and then use it in every request
const LanguageSelector = ({ open }) => {
  const [selectedLanguage, SetSelectedLanguage] = useState(null); // or an appropriate default value
  const [selectedLanguageObject, SetSelectedLanguageObject] = useState(null);
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
  const getLocalizationAction = LocalizationSchemaActions?.find(
    (action) => action.dashboardFormActionMethodType === "Get"
  );
  const { setRight, setLocalization, setLan, Right, Lan, localization } =
    useContext(LanguageContext);
  // Using useFetch hook to fetch data
  const { data: dataLocals } = useFetch(
    `/${getLocalizationAction?.routeAdderss}/${selectedLanguage || Lan}`,
    GetProjectUrl()
  );

  function PrepareLanguage(shortName, language) {
    if (dataLocals) {
      const localFormat = dataLocals?.replace(/ObjectId\("([^"]+)"\)/g, '"$1"');

      // Parse the formatted string into a JavaScript object
      const dataObject = JSON.parse(localFormat);
      delete dataObject._id;
      setLocalization(dataObject);
      window.localStorage.removeItem("localization");

      window.localStorage.setItem("localization", JSON.stringify(dataObject));
    }
    SetSelectedLanguageObject(language);
    SetSelectedLanguage(shortName);
    setLan(shortName);
    if (language) {
      setRight(language.rightDirectionEnable);
      window.localStorage.setItem("right", language.rightDirectionEnable);
      window.localStorage.setItem("languageID", language.languageID);
      window.localStorage.setItem("language", shortName);
    }
  }

  useEffect(() => {
    if (
      !Lan ||
      !Right ||
      !localization ||
      !window.localStorage.getItem("languageID")
    ) {
      const shortName = data?.dataSource[0]?.shortName;

      const language = data?.dataSource?.find(
        (language) => language.shortName === selectedLanguage
      );
      PrepareLanguage(shortName, language);
    }
  });

  // useEffect(() => {

  // }, [selectedLanguageObject]);

  // local

  //const { data: dataLocals } =FetchLocalizationData(window.localStorage.getItem("language"));

  const changeLanguage = (e) => {
    SetSelectedLanguage(e.target.value);
    SetSelectedLanguageObject(
      data?.dataSource?.find(
        (language) => language.shortName === selectedLanguage
      )
    );
  };

  return (
    <>
      {open ? (
        <div className="circle-container">
          {/* <FetchLocalizationData
            language={selectedLanguage}
            setLocalizationData={setDataLocals}
          /> */}
          <select
            id="languageSelect"
            className="uppercase text-xs color !cursor-pointer"
            onChange={changeLanguage}
          >
            {data?.dataSource?.map((name) => (
              <option
                value={name.shortName}
                // onClick={() => setLan(${name.shortName})}
                key={name.shortName}
              >
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
