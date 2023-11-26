import React, { useState } from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import UserPanel from '../user-panel/UserPanel';
import './Header.scss';
import { Template } from 'devextreme-react/core/template';
import { BiWorld } from "react-icons/bi";
import LanguageSelector from './LanguageSelector';

export default function Header({ menuToggleEnabled, title, toggleMenu }) {
  const [open, setopen] =useState(false);
  return (
    <header className={'header-component flex'}>
      <Toolbar className={'header-toolbar flex justify-content-center align-items-center'}>
        <Item
          visible={menuToggleEnabled}
          location={'before'}
          widget={'dxButton'}
          cssClass={'menu-button'}
        >
          <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
        </Item>
        <Item
          location={'before'}
          cssClass={'header-title'}
          text={title}
          visible={!!title}
        />
        <Item
          location={'after'}
          locateInMenu={'auto'}
          menuItemTemplate={'userPanelTemplate'}
        >
          <Button
            className={'user-button authorization'}
            width={210}
            height={'100%'}
            stylingMode={'text'}
          >
            <UserPanel menuMode={'context'} />
          </Button>
        </Item>
        <Item 
        location='after'
        locateInMenu='auto'
        >
          <Button
            width={open? 80:30}
            onClick={()=>setopen(true)}
            height={'100%'}
            stylingMode={'text'}
          >
            {
              open?
              (<div><LanguageSelector/>
                </div>):
                
              (<div className='flex justify-content-end align-items-center'>
              <BiWorld size={30} className=' text-[#ff5722]' />
            </div>)
            }
            {/* <LanguageSelector/>
        <div className='flex justify-content-end align-items-center'>
          <BiWorld size={30} className=' text-[#ff5722]' />
        </div> */}
          </Button>
        </Item>
        <Template name={'userPanelTemplate'}>
          <UserPanel menuMode={'list'} />
        </Template>
      </Toolbar>
      {/* <LanguageSelector/> */}
    </header>
  );
}
