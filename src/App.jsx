import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TourList, { loader as tourListLoader } from './features/tour/TourList';
import MyTours from './features/tour/MyTours';
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
