// LanguageSelector.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import useFetch from '../hooks/useFetch';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const {data} =useFetch('/Language/GetLanguages?ActiveStatus=1&pagination.PageSize=100&pagination.PageNumber=1')
    
const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
};

  return (
    <div>
      <select
        id="languageSelect"
        // onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language} className='uppercase text-xs  text-[#ff5722]'
        >
        {
            data?.map((name)=>{
                return<option value={name.shortName} className=' '>{name.shortName}</option>
            })
        }
        {/* Add more language options as needed */}
      </select>
    </div>
  );
};

export default LanguageSelector;
