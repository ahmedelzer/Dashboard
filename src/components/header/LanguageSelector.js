// LanguageSelector.js
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hooks/APIsFunctions/useFetch";
import { BiSolidCircleHalf } from "react-icons/bi";
import { LanguageContext } from "../../contexts/Language";
import { defaultProjectProxyRoute } from "../../request";
const LanguageSelector = () => {
  const { setRight, Right, setLan } = useContext(LanguageContext);
  const { data } = useFetch(
    "/Language/GetLanguages?ActiveStatus=1&PageSize=100&PageNumber=1",
    defaultProjectProxyRoute
  );
  const changeLanguage = (e) => {
    const selectedLanguage = e.target.value;
    const selectedLanguageObject = data.dataSource.find(
      (language) => language.shortName === selectedLanguage
    );
    if (selectedLanguageObject) {
      setLan(selectedLanguage);
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
