import Brand from '../pages/Brand/Brand';
import Home from '../pages/Home/Home';
import Contact from '../pages/Contact/Contact';
import Profile from '../pages/Profile/Profile';
import Login from '../pages/Login/Login';
import Cart from '../pages/Cart/Cart';
import Product from '../pages/Product/Product';
import RegisterForm from '../pages/Regsiter/Register';
import Checkout from '../pages/Checkout/Checkout';
import About from '../pages/About/About';
import OrderDetail from '../pages/OrderDetail/OrderDetail';
import Order from '../pages/Order/Order';

const publicRoutes = [
    { path: '/', component: Home },
    // { path: '/brand', component: Brand },
    { path: '/brand/:brandId', component: Brand },

    { path: '/about', component: About },
    { path: '/orderdetail/:orderId', component: OrderDetail },
    { path: '/order', component: Order },

    { path: '/contact', component: Contact },
    { path: '/login', component: Login },
    { path: '/register', component: RegisterForm },
    { path: '/profile', component: Profile },
    { path: '/cart', component: Cart },
    { path: '/checkout', component: Checkout },
    { path: '/product/:productId', component: Product },
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
