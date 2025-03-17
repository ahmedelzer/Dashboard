import TreeView from "devextreme-react/tree-view";
import * as events from "devextreme/events";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigation } from "../../contexts/navigation";
import { defaultProjectProxyRoute } from "../../request";
import { useScreenSize } from "../../utils/media-query";
import useFetch from "../hooks/APIsFunctions/useFetch";
import "./SideNavigationMenu.scss";
import { LanguageContext } from "../../contexts/Language";
let [id, setId] = "";
function SideNavigationMenu(props) {
  let { data, error } = useFetch(
    "/Dashboard/GetDashboardMenuItems?pagination.PageSize=100&pagination.PageNumber=1",
    defaultProjectProxyRoute
  );

  const { localization } = useContext(LanguageContext);

  //   const data=
  //   [
  //     {
  //         dashboardCategoryName: "Dashboard Models",
  //         dashboardMenuItems: [
  //             {
  //                 dashboardItemId: "b41d8fe6-c6fe-40fa-a2ad-0b3f0060bcd8",
  //                 dashboardMenuItemName: "Dashboard Items"
  //             },
  //             {
  //                 dashboardItemId: "69a840d3-1170-4297-a6f0-baffae16a94f",
  //                 dashboardMenuItemName: "Dashboard Categories"
  //             }
  //         ]
  //     }
  // ]
  const { selectedItemChanged } = props;

  // let navigation = [];
  let navigation = [
    {
      id: 1,
      text: localization.homePage.text,
      path: "/home",
      icon: "home",
    },
  ];
  // if(data){
  data?.dataSource?.forEach((cat) => {
    return navigation.push({
      text: cat?.dashboardCategoryName,
      icon: "folder",
      items: cat?.dashboardMenuItems?.map((i) => {
        return {
          id: i.dashboardItemID,
          text: i.dashboardMenuItemName,
          path: `/${i?.routePath}/${i?.dashboardItemID}`,
        };
      }),
    });
  });
  const { children, onMenuReady } = props;
  const { isLarge } = useScreenSize();

  function normalizePath() {
    return navigation.map((item) => ({
      ...item,
      expanded: isLarge,
      path: item.path && !/^\//.test(item.path) ? `/${item.path}` : item.path,
    }));
  }

  const items = useMemo(normalizePath, []);

  const {
    navigationData: { currentPath },
  } = useNavigation();
  const treeViewRef = useRef(null);
  const wrapperRef = useRef();

  const getWrapperRef = useCallback(
    (element) => {
      const prevElement = wrapperRef.current;
      if (prevElement) {
        events.off(prevElement, "dxclick");
      }

      wrapperRef.current = element;
      events.on(element, "dxclick", (e) => {
        props.openMenu(e);
      });
    },
    [props]
  );

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance;
    if (!treeView) {
      return;
    }

    if (currentPath !== undefined) {
      treeView.selectItem(currentPath);
      treeView.expandItem(currentPath);
    }

    if (props.compactMode) {
      treeView.collapseAll();
    }
  }, [currentPath, props.compactMode]);

  const handleItemClick = (e) => {
    selectedItemChanged(e);
  };
  // console.log(id)
  // const Categories=
  return (
    <div
      className={"dx-swatch-additional side-navigation-menu"}
      ref={getWrapperRef}
    >
      {children}
      {/* <Link to={'/dynmicTable'} className=''> */}
      <div className={"menu-container"}>
        <TreeView
          ref={treeViewRef}
          items={navigation}
          keyExpr={"path"}
          selectionMode={"single"}
          focusStateEnabled={false}
          expandEvent={"click"}
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          width={"100%"}
          // selectByClick={selectedItemChanged} //!here the make sleeted item apers
        ></TreeView>
      </div>
      {/* </Link> */}
    </div>
  );
}
export default SideNavigationMenu;
