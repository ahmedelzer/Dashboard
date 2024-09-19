import React, { useContext, useState } from "react";
import Toolbar, { Item } from "devextreme-react/toolbar";
import Button from "devextreme-react/button";
import UserPanel from "../user-panel/UserPanel";
import "./Header.scss";
import { Template } from "devextreme-react/core/template";
import { BiWorld } from "react-icons/bi";
import LanguageSelector from "./LanguageSelector";
import { LanguageContext } from "../../contexts/Language";

export default function Header({ menuToggleEnabled, title, toggleMenu }) {
  const [open, setopen] = useState(false);
  const { Right } = useContext(LanguageContext);
  const direction = Right ? "after" : "before";
  const oppositeDirection = Right ? "before" : "after";

  return (
    <header className={"header-component flex"}>
      <Toolbar
        className={
          "header-toolbar flex justify-content-center align-items-center"
        }
      >
        <Item
          visible={menuToggleEnabled}
          location={direction}
          // location={"before"}
          widget={"dxButton"}
          cssClass={"menu-button"}
        >
          <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
        </Item>
        <Item
          location={direction}
          // location={"after"}
          cssClass={"header-title"}
          text={title}
          visible={!!title}
        />
        <Item
          // location={"after"}
          location={oppositeDirection}
          locateInMenu={"auto"}
          menuItemTemplate={"userPanelTemplate"}
        >
          <Button
            className={"user-button authorization"}
            width={210}
            height={"100%"}
            stylingMode={"text"}
          >
            <UserPanel menuMode={"context"} />
          </Button>
        </Item>
        <Item
          // location={"after"}
          location={oppositeDirection}
          locateInMenu="auto"
        >
          <Button
            width={100}
            onClick={() => setopen(true)}
            height={"100%"}
            stylingMode={"text"}
            rtlEnabled={false}
            className={`${open ? "!cursor-auto" : "!cursor-pointer"} mx-1 `}
          >
            <div>
              <LanguageSelector open={open} />
            </div>
          </Button>
        </Item>
        <Template name={"userPanelTemplate"}>
          <UserPanel menuMode={"list"} />
        </Template>
      </Toolbar>
      {/* <LanguageSelector/> */}
    </header>
  );
}
