// LanguageSelector.js
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hooks/APIsFunctions/useFetch";
import { BiSolidCircleHalf } from "react-icons/bi";
import { LanguageContext } from "../../contexts/Language";
const LanguageSelector = () => {
  const { setRight, setLan } = useContext(LanguageContext);
  const { i18n } = useTranslation();
  const { data } = useFetch(
    "/Language/GetLanguages?ActiveStatus=1&PageSize=100&PageNumber=1"
  );

  const changeLanguage = (e) => {
    const selectedLanguage = e.target.value;
    const selectedLanguageObject = data.dataSource.find(
      (language) => language.shortName === selectedLanguage
    );

    if (selectedLanguageObject) {
      setLan(selectedLanguage);
      setRight(selectedLanguageObject.rightDirectionEnable);
      window.localStorage.setItem("language", selectedLanguage);
    }
  };

  return (
    <div className="circle-container ">
      <select
        id="languageSelect"
        value={i18n.language}
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
