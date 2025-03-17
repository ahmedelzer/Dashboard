import Button from "devextreme-react/button";
import { Template } from "devextreme-react/core/template";
import Drawer from "devextreme-react/drawer";
import ScrollView from "devextreme-react/scroll-view";
import Toolbar, { Item } from "devextreme-react/toolbar";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { Footer, Header, SideNavigationMenu } from "../../components";
import { LanguageContext } from "../../contexts/Language";
import { useAuth } from "../../contexts/auth";
import { useScreenSize } from "../../utils/media-query";
import { useMenuPatch } from "../../utils/patches";
import "./side-nav-inner-toolbar.scss";

export default function SideNavInnerToolbar({ title, children }) {
  const { Right } = useContext(LanguageContext);
  const { CheckPortalMenuItem } = useAuth();
  const scrollViewRef = useRef(null);
  const navigate = useNavigate();
  const { isXSmall, isLarge } = useScreenSize();
  const [patchCssClass, onMenuReady] = useMenuPatch();
  const [menuStatus, setMenuStatus] = useState(
    isLarge ? MenuStatus.Opened : MenuStatus.Closed
  );

  const toggleMenu = useCallback(({ event }) => {
    setMenuStatus((prevMenuStatus) =>
      prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.Opened
        : MenuStatus.Closed
    );
    event.stopPropagation();
  }, []);

  const temporaryOpenMenu = useCallback(() => {
    setMenuStatus((prevMenuStatus) =>
      prevMenuStatus === MenuStatus.Closed
        ? MenuStatus.TemporaryOpened
        : prevMenuStatus
    );
  }, []);

  const onOutsideClick = useCallback(() => {
    setMenuStatus((prevMenuStatus) =>
      prevMenuStatus !== MenuStatus.Closed && !isLarge
        ? MenuStatus.Closed
        : prevMenuStatus
    );
    return menuStatus !== MenuStatus.Closed;
  }, [isLarge]);

  // const onNavigationChanged = useCallback(
  //   ({ itemData, event, node }) => {
  //     if (
  //       menuStatus === MenuStatus.Closed ||
  //       !itemData.path ||
  //       node.selected
  //       // || !CheckPortalMenuItem(itemData.path.split("/").pop())
  //     ) {
  //       event.preventDefault();
  //       return;
  //     }

  //     navigate(itemData.path);
  //     scrollViewRef.current.instance.scrollTo(0);

  //     if (!isLarge || menuStatus === MenuStatus.TemporaryOpened) {
  //       setMenuStatus(MenuStatus.Closed);
  //       event.stopPropagation();
  //     }
  //   },
  //   [navigate, menuStatus, isLarge]
  // );
  const onNavigationChanged = useCallback(
    ({ itemData, event, node }) => {
      if (menuStatus === MenuStatus.Closed || !itemData.path) {
        event.preventDefault();
        return;
      }
      navigate(itemData.path);
      scrollViewRef.current.instance.scrollTo(0);
      if (!isLarge || menuStatus === MenuStatus.TemporaryOpened) {
        setMenuStatus(MenuStatus.Closed);
        event.stopPropagation();
      }
    },
    [navigate, menuStatus, isLarge]
  );
  const [direction, setDiction] = useState(Right ? "rtl" : "ltr");
  const [position, setPosition] = useState(Right ? "right" : "left");
  useEffect(() => {
    setDiction(Right ? "rtl" : "ltr");
    if (isLarge) {
      setPosition("left");
    } else {
      setPosition(Right ? "right" : "left");
    }
  }, [Right, isLarge]);

  return (
    <div className={"side-nav-inner-toolbar"}>
      <Drawer
        className={["drawer", patchCssClass].join(" ")}
        position={position}
        closeOnOutsideClick={onOutsideClick}
        openedStateMode={isLarge ? "shrink" : "overlap"}
        revealMode={isXSmall ? "slide" : "expand"}
        minSize={isXSmall ? 0 : 60}
        maxSize={250}
        shading={!isLarge}
        opened={menuStatus !== MenuStatus.Closed}
        template={"menu"}
      >
        <div className={"container"} dir={direction}>
          <Header menuToggleEnabled={isXSmall} toggleMenu={toggleMenu} />
          <ScrollView ref={scrollViewRef} className={"layout-body with-footer"}>
            <div className={"content"}>
              {React.Children.map(children, (item) => {
                return item.type !== Footer && item;
              })}
            </div>
            <div className={"content-block"}>
              {React.Children.map(children, (item) => {
                return item.type === Footer && item;
              })}
            </div>
          </ScrollView>
        </div>
        <Template name={"menu"}>
          <SideNavigationMenu
            compactMode={menuStatus === MenuStatus.Closed}
            selectedItemChanged={onNavigationChanged}
            openMenu={temporaryOpenMenu}
            onMenuReady={onMenuReady}
          >
            <Toolbar id={"navigation-header"}>
              {!isXSmall && (
                <Item location={"before"} cssClass={"menu-button"}>
                  <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
                </Item>
              )}
              <Item
                location={"before"}
                cssClass={"header-title"}
                text={title}
              />
            </Toolbar>
          </SideNavigationMenu>
        </Template>
      </Drawer>
    </div>
  );
}

const MenuStatus = {
  Closed: 1,
  Opened: 2,
  TemporaryOpened: 3,
};
