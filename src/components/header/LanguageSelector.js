// LanguageSelector.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import useFetch from '../hooks/APIsFunctions/useFetch';
import { BiSolidCircleHalf } from 'react-icons/bi';
const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const {data} =useFetch('/Language/GetLanguages?ActiveStatus=1&PageSize=100&PageNumber=1')
    
const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
};

  return (
    <div className="circle-container ">
      <select
        id="languageSelect"
        value={i18n.language}
        className='uppercase text-xs text-[#ff5722] !cursor-pointer'
      >
        {data?.dataSource?.map((name) => (
          <option value={name.shortName} key={name.shortName}>
            {name.shortName}
          </option>
        ))}
      </select>
    </div>
    // <div>
    //   <select
    //     id="languageSelect"
    //     // onChange={(e) => changeLanguage(e.target.value)}
    //     value={i18n.language} className='uppercase text-xs  text-[#ff5722]'
    //     >
    //     {
    //         data?.dataSource?.map((name)=>{
    //             return<option value={name.shortName} className=' '>{name.shortName}</option>
    //         })
    //     }
    //     {/* Add more language options as needed */}
    //   </select>
    // </div>
  );
};

export default LanguageSelector;
