import {
  DynamicTable,
  AddingDropdown,
  Form,
  Test,
  DynamicLiveForm,
} from "./pages/index";
import { withNavigationWatcher } from "./contexts/navigation";

const routes = [
  {
    path: "/profile",
    element: AddingDropdown,
  },
  {
    path: "/dynamicLiveForm/:dashboardItemID",
    element: DynamicLiveForm,
  },
  {
    path: "/test",
    element: Test,
  },
  {
    path: "/dynamicForm/:dashboardItemID",
    element: Form,
  },
  {
    path: "/dynamicTable/:dashboardItemID",
    element: DynamicTable,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
