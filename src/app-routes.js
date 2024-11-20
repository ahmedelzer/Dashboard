import { withNavigationWatcher } from "./contexts/navigation";
import Home from "./pages/home/Home";
import {
  DynamicLiveForm,
  DynamicTable,
  DynamicTransform,
  Form,
  DynamicDependForm,
} from "./pages/index";
// const routes = [
//   {
//     path: "/dynamicLiveForm/:dashboardItemID",
//     element: DynamicLiveForm,
//   },
//   {
//     path: "/test",
//     element: Test,
//   },
//   {
//     path: "/dynamicForm/:dashboardItemID",
//     element: Form,
//   },
//   {
//     path: "/dynamicTransformForm/:dashboardItemID",
//     element: DynamicTransform,
//   },
//   {
//     path: "/dynamicTable/:dashboardItemID",
//     element: DynamicTable,
//   },
// ];
function SwitchElement(element) {
  switch (element) {
    case "dynamicTable":
      return DynamicTable;
    case "dynamicFormDependencies":
      return DynamicDependForm;
    case "dynamicTransformForm":
      return DynamicTransform;
    case "dynamicForm":
      return Form;
    case "dynamicLiveForm":
      return DynamicLiveForm;
    default:
      return Home;
  }
}
export default function ApiRoutes(routes) {
  if (typeof routes === "string") return [];
  const routesWithElement = routes
    ?.map((route) => {
      return {
        path: `/${route.RoutePath}/${route.DashboardItemID}`,
        element: SwitchElement(route.RoutePath),
      };
    })
    .filter(Boolean);

  return routesWithElement?.map((route) => {
    return {
      ...route,
      element: withNavigationWatcher(route.element, route.path),
    };
  });
}
