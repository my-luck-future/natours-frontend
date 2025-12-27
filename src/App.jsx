import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TourList, { loader as tourListLoader } from './features/tour/TourList';
import MyTours, { loader as myTourLoader } from './features/tour/MyTours';
import Tour, { loader as tourLoader } from './features/tour/Tour';
import Error from './ui/Error';
import Login from './features/account/Login';
import Account from './features/account/Account';
import AppLayout from './ui/AppLayout';

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
        loader: myTourLoader,
        errorElement: <Error />,
      },
      {
        path: '/tour/:slug',
        element: <Tour />,
        loader: tourLoader,
        errorElement: <Error />,
      },
      {
        path: '/me',
        element: <Account />,
        errorElement: <Error />,
      },
      { path: '/login', element: <Login /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
