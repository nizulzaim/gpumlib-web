import {IndexNavigation, Toolbar} from "/imports/client/template";
import Dashboard from '/imports/client/views/public/Dashboard.vue';
import DataManage from '/imports/client/views/public/user/DataManage.vue';
import SomRun from '/imports/client/views/public/user/SomRun.vue';
import SomHistory from '/imports/client/views/public/user/SomHistory.vue';

let routesParent = "/dashboard";
export default [{
    path: `${routesParent}/`,
    name: "Dashboard",
    meta: { fixToolbar: true, pageTitle: "Pelangi" },
    components: {
        default: Dashboard,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
}, {
    path: `${routesParent}/data-manage`,
    name: "DataManage",
    meta: { fixToolbar: true, pageTitle: "Data Management" },
    components: {
        default: DataManage,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},{
    path: `${routesParent}/som-run`,
    name: "SomRun",
    meta: { fixToolbar: true, pageTitle: "SOM Run" },
    components: {
        default: SomRun,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
}, {
    path: `${routesParent}/som-history`,
    name: "SomHistory",
    meta: { fixToolbar: true, pageTitle: "SOM History" },
    components: {
        default: SomHistory,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},];
