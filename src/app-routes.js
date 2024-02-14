import { DynamicTable, AddingDropdown, Form } from "./pages/index";
import { withNavigationWatcher } from "./contexts/navigation";

const routes = [
  {
    path: "/profile",
    element: AddingDropdown,
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
