// import React, { useEffect, useRef, useCallback, useMemo } from 'react';
// import TreeView, { Item } from 'devextreme-react/tree-view';
// import { useNavigation } from '../../contexts/navigation';
// import { useScreenSize } from '../../utils/media-query';
// import './SideNavigationMenu.scss';
// import useFetch from '../hooks/useFetch';
// import * as events from 'devextreme/events';
// import Loading,{loading} from '../loading/Loading';
// import { Link, useParams } from 'react-router-dom';
// import { DynmicTable } from '../../pages';
// import { useState } from 'react';

// let [id,SetId]=''
// export default function SideNavigationMenu(props) {
//   // let {data} = useFetch('/Dashboard/GetDashboardMenuItems?pagination.PageSize=10&pagination.PageNumber=1');
//   const data=
//     [
//       {
//           dashboardCategoryName: "Dashboard Models",
//           dashboardMenuItems: [
//               {
//                   dashboardItemId: "b41d8fe6-c6fe-40fa-a2ad-0b3f0060bcd8",
//                   dashboardMenuItemName: "Dashboard Items"
//               },
//               {
//                   dashboardItemId: "69a840d3-1170-4297-a6f0-baffae16a94f",
//                   dashboardMenuItemName: "Dashboard Categories"
//               }
//           ]
//       }
//   ]
//   [id,SetId]=useState('')
//   console.log(data)
//   data?.dashboardMenuItems?.map((i)=>{
//     console.log(i);
//   })
//   let navigation=[]
//   data?.map((cat)=>{
//     navigation=[{
//       id:'1',
//         text: 'Home',
//         path: 'dynmicTable',
//         icon: 'home'
//     },
//   {
//     text: cat.dashboardCategoryName,
//         icon: 'folder',
//         items: 
//         cat?.dashboardMenuItems?.map((i)=>{
//           return {id:i.dashboardItemId, text:i.dashboardMenuItemName, path:i.dashboardMenuItemName}
//         }),
//   }
//   ]
//   });
 
//   const {
//     children,
//     selectedItemChanged,
//     openMenu,
//     compactMode,
//     onMenuReady
//   } = props;


//   const { isLarge } = useScreenSize();
//   function normalizePath() {
//     return navigation.map((item) => (
//       { ...item, expanded: isLarge, path: item.path && !(/^\//.test(item.path)) ? `/${item.path}` : item.path }
//     ))
//   }


//   const items = useMemo(
//     normalizePath,
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []
//   );

//   const { navigationData: { currentPath } } = useNavigation();
// const selectedItemID = null;
//   const treeViewRef = useRef(null);
//   const wrapperRef = useRef();
//   const getWrapperRef = useCallback((element) => {
//     const prevElement = wrapperRef.current;
//     if (prevElement) {
//       events.off(prevElement, 'dxclick');
//     }

//     wrapperRef.current = element;
//     events.on(element, 'dxclick', (e) => {
//       openMenu(e);
//     });
//   }, [openMenu]);

//   useEffect(() => {
//     const treeView = treeViewRef.current && treeViewRef.current.instance;
//     if (!treeView) {
//       return;
//     }

//     if (currentPath !== undefined) {
//       console.log(items.id)
//       treeView.selectItem(currentPath);
//       treeView.expandItem(currentPath);
//     }
//     // console.log(navigation)
//     // navigation.map((item)=>{
//     //   console.log(item)
      
//     // })

//     if (compactMode) {
//       treeView.collapseAll();
//     }
//   }, [currentPath, compactMode]);
//   const t=(e)=>{
//     console.log(e)
//     // <DynmicTable id={e}/>
//   }
   
// const handlePropertyChange = (e) => {
//   if(e.name === "changedProperty") {
//       // handle the property change here
//   }
// }
// const ItemsClick=(e)=>{
  
// }
// console.log(id)
//   return (
//     <div
//       className={'dx-swatch-additional side-navigation-menu'}
//       ref={getWrapperRef}
//     >
//       {children}
//         <Link to={'/dynmicTable'}>
//       <div className={'menu-container'}>
//         {
//           items?
//           (

//               <TreeView
//               id={items.id}
//               ref={treeViewRef}
//               items={items}
//               keyExpr={'path'}
//               selectionMode={'single'}
//               focusStateEnabled={false}
//               expandEvent={'click'}
//               onItemClick={selectedItemChanged}
//               onContentReady={onMenuReady}
//               width={'100%'}
//               noDataText={loading}
//               onOptionChanged={handlePropertyChange}
//               ///onItemSelectionChanged={id= items.id}
//               // onItemClick={t(items.id)}
//               // onItemClick={ItemsClick(items.id)}
//             />
//             // navigation.map((item)=>{
//               //   <Link to={'/DynmicTable'}>
//               //   ahmed
//               // </Link>
//               // })
              
//               ):(
                
//                 <Loading/>
//                 )
//               }
        
//       </div>
//               </Link>
//     </div>
//   );
// }
// export { id };



import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import TreeView from 'devextreme-react/tree-view';
import * as events from 'devextreme/events';
import { useNavigation } from '../../contexts/navigation';
import { useScreenSize } from '../../utils/media-query';
import './SideNavigationMenu.scss';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
let [id, setId] = ''
function SideNavigationMenu(props) {
  // let { data } = useFetch('/Dashboard/GetDashboardMenuItems?pagination.PageSize=10&pagination.PageNumber=1');
  const data=
  [
    {
        dashboardCategoryName: "Dashboard Models",
        dashboardMenuItems: [
            {
                dashboardItemId: "b41d8fe6-c6fe-40fa-a2ad-0b3f0060bcd8",
                dashboardMenuItemName: "Dashboard Items"
            },
            {
                dashboardItemId: "69a840d3-1170-4297-a6f0-baffae16a94f",
                dashboardMenuItemName: "Dashboard Categories"
            }
        ]
    }
]
const {
  selectedItemChanged,
  openMenu,
  compactMode,
  Id
} = props;
  [id, setId] = useState('');

  let navigation = [];
  data?.map((cat) => {
    navigation = [
      {
        id: 1,
        text: 'Home',
        path: '/home',
        icon: 'home',
      },
      {
        text: cat.dashboardCategoryName,
        icon: 'folder',
        items: cat?.dashboardMenuItems?.map((i) => {
          return { id: i.dashboardItemId, text: i.dashboardMenuItemName, path: `/dynmicTable/${i.dashboardItemId}` };
        }),
      },
    ];
  });

  const { children, onMenuReady } = props;
  const { isLarge } = useScreenSize();

  function normalizePath() {
    return navigation.map((item) => ({
      ...item,
      expanded: isLarge,
      path:  item.path && !(/^\//.test(item.path)) ? `/${item.path}` : item.path
    }));
  }

  const items = useMemo(normalizePath, []);

  const { navigationData: { currentPath } } = useNavigation();
  const treeViewRef = useRef(null);
  const wrapperRef = useRef();

  const getWrapperRef = useCallback((element) => {
    const prevElement = wrapperRef.current;
    if (prevElement) {
      events.off(prevElement, 'dxclick');
    }

    wrapperRef.current = element;
    events.on(element, 'dxclick', (e) => {
      props.openMenu(e);
    });
  }, [props]);

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
    
    const selectedItem = e.itemData;
    if (selectedItem && selectedItem.id) {
      // console.log(selectedItem.id);
      setId(selectedItem.id);
      // You can perform any additional logic here before rendering DynmicTable
      // For example, you can navigate to the DynmicTable page using react-router-dom
      // history.push(/DynmicTable/${selectedItem.id});
    }

  };
// console.log(id)
// const Categories= 
  return (
    <div className={'dx-swatch-additional side-navigation-menu'} ref={getWrapperRef}>
      {children}
        {/* <Link to={'/dynmicTable'} className=''> */}
      <div className={'menu-container'}>
        <TreeView
          ref={treeViewRef}
          items={items}
          keyExpr={'path'}
          selectionMode={'single'}
          focusStateEnabled={false}
          expandEvent={'click'}
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          width={'100%'}
          selectByClick={selectedItemChanged}
        >
        </TreeView>
      </div>
        {/* </Link> */}
    </div>
  );
}
export { id, setId };
export default SideNavigationMenu
