import Login from '../Pages/Login/Login';
import Maps from '../Pages/Maps/Maps';


const routes= [
    {
        name: "Login", path: "/", component: Login, exact: true
    },
    {
        name: "Maps", path: "/maps", component: Maps, exact: true
    },

];

export default routes;