import Header from './Header';
import Footer from './Footer';
import Loader from './Loader';
import { Outlet, useNavigation } from 'react-router-dom';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div>
      {isLoading && <Loader />}

      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}

export default AppLayout;
