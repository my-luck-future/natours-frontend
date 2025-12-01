import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import TourList, { loader as tourListLoader } from './features/tour/TourList';
import MyTours from './features/tour/MyTours';
import Tour, { loader as tourLoader } from './features/tour/Tour';
import Error from './ui/Error';
import Login from './features/account/Login';
import Account from './features/account/Account';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import { action as updateOrderAction } from './features/order/UpdateOrder';

import AppLayout from './ui/AppLayout';
import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: '/',
        element: <TourList />,
        loader: tourListLoader,
        errorElement: <Error />,
      },
      {
        path: '/my-tours',
        element: <MyTours />,
        errorElement: <Error />,
      },
      {
        path: '/tour/:slug',
        element: <Tour />,
        loader: tourLoader,
        errorElement: <Error />,
      },
      { path: '/login', element: <Login /> },
      { path: '/me', element: <Account /> },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
