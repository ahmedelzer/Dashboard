import { DynamicTable, Data } from './pages/index';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
    {
        path: '/profile',
        element: Data
    },
    {
        path: '/dynamicTable/:dashboardItemID',
        element: DynamicTable
    }
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
