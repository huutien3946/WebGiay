//Layouts
import { HeaderOnly } from '../components/Layouts';

import Brand from '../pages/Brand/Brand';
import Home from '../pages/Home/Home';
import Contact from '../pages/Contact/Contact';
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login/login';
import Cart from '../pages/Cart/Cart';
const publicRoutes = [
    { path: '/', component: Home },
    // { path: '/brand', component: Brand },
    { path : '/brand/:brandId' ,component: Brand },
    { path: '/contact', component: Contact, layout: null },
    { path: '/login', component: Login, layout: HeaderOnly },
    { path: '/profile', component: Profile, layout: HeaderOnly },
    { path: '/cart', component: Cart, layout: HeaderOnly },
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
