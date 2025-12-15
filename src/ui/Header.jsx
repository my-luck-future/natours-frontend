import { useSelector } from 'react-redux';
import Button from './Button';
import { logout } from '../services/login';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetUser } from '../features/user/userTourSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userTour);

  async function handleLogout(e) {
    e.preventDefault();
    await logout();
    dispatch(resetUser());
    navigate('/');
  }

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Button to="/" type="index">
          All tours
        </Button>
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {user.name !== '' && user.photo !== '' ? (
          <>
            <Button onClick={handleLogout} type="logout">
              Log out
            </Button>
            <Button to="/me" type="me">
              <img
                className="nav__user-img"
                src={`/img/users/${user.photo}`}
                alt={`Pic of ${user.name}`}
              />
              <span>{user.name.split(' ')[0]}</span>
            </Button>
          </>
        ) : (
          <>
            <Button to="/login" type="login">
              Log in
            </Button>
            <Button to="#" type="signup">
              Sign up
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
