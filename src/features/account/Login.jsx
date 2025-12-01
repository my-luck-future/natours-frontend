import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../user/userTourSlice';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/login';

function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !pwd) return;
    const user = await login(email, pwd);
    // console.info('login: ', JSON.stringify(user));
    dispatch(updateUser(user));
    navigate('/');
  }

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form form--login" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              className="form__input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="form__input"
              type="password"
              placeholder="••••••••"
              required
              minLength="8"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green">Login</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
