import Brand from '../pages/Brand/Brand';
import Home from '../pages/Home/Home';
import Contact from '../pages/Contact/Contact';
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login/Login';
import Cart from '../pages/Cart/Cart';
import Product from '../pages/Product/Product';
const publicRoutes = [
    { path: '/', component: Home },
    // { path: '/brand', component: Brand },
    { path: '/brand/:brandId', component: Brand },
    { path: '/contact', component: Contact, layout: null },
    { path: '/login', component: Login },
    { path: '/profile', component: Profile },
    { path: '/cart', component: Cart },
    { path: '/product/:productId', component: Product },
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
