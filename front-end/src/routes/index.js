//Layouts
import { HeaderOnly } from '../components/Layouts';

import Brand from '../pages/Brand/Brand';
import Home from '../pages/Home/Home';
import Contact from '../pages/Contact/Contact';
import Profile from '../pages/Profile/Profile';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/brand', component: Brand },
    { path: '/contact', component: Contact, layout: null },
    { path: '/profile', component: Profile, layout: HeaderOnly },
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
