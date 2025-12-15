import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../user/userTourSlice';
import { updateSettings } from '../../services/settings';

// 导航项组件（对应 mixin navItem）
function NavItem({ link, text, icon, active }) {
  return (
    <li className={active ? 'side-nav--active' : ''}>
      <a href={link}>
        <svg>
          <use xlinkHref={`img/icons.svg#icon-${icon}`} />
        </svg>
        {text}
      </a>
    </li>
  );
}

function Account() {
  const user = useSelector((state) => state.userTour);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [photo, setPhoto] = useState(user?.photo);
  const dispatch = useDispatch();

  async function handleSaveSettings(e) {
    e.preventDefault();

    if (!name || !email) return;

    await updateSettings({ name, email }, 'data');
    dispatch(updateUser({ ...user, name, email }));
  }

  const [curPwd, setCurPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmNewPwd, setConfirmNewPwd] = useState('');

  async function handleUpdatePwd(e) {
    e.preventDefault();
    if (!curPwd || !newPwd || !confirmNewPwd) return;
    await updateSettings(
      {
        passwordCurrent: curPwd,
        password: newPwd,
        passwordConfirm: confirmNewPwd,
      },
      'password'
    );
  }

  return (
    <main className="main">
      <div className="user-view">
        {/* 侧边导航 */}
        <nav className="user-view__menu">
          <ul className="side-nav">
            <NavItem link="#" text="Settings" icon="settings" active={true} />
            <NavItem
              link="/my-tours"
              text="My bookings"
              icon="briefcase"
              active={false}
            />
            <NavItem link="#" text="My reviews" icon="star" active={false} />
            <NavItem
              link="#"
              text="Billing"
              icon="credit-card"
              active={false}
            />
          </ul>

          {/* 管理员导航（条件渲染） */}
          {user?.role === 'admin' && (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                <NavItem link="#" text="Manage tours" icon="map" />
                <NavItem link="#" text="Manage users" icon="users" />
                <NavItem link="#" text="Manage reviews" icon="star" />
                <NavItem link="#" text="Manage bookings" icon="briefcase" />
              </ul>
            </div>
          )}
        </nav>

        {/* 主内容区 */}
        <div className="user-view__content">
          {/* 账号设置表单 */}
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">
              Your account settings
            </h2>

            <form className="form form-user-data" onSubmit={handleSaveSettings}>
              <div className="form__group">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="form__input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  name="name"
                />
              </div>

              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  className="form__input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  name="email"
                />
              </div>

              <div className="form__group form__photo-upload">
                <img
                  className="form__user-photo"
                  src={`/img/users/${photo || 'default.jpg'}`}
                  alt="User"
                />
                <input
                  className="form__upload"
                  type="file"
                  accept="image/*"
                  id="photo"
                  name="photo"
                  onChange={(e) => setPhoto(e.target.value)}
                />
                <label htmlFor="photo">Choose new photo</label>
              </div>

              <div className="form__group right">
                <button className="btn btn--small btn--green">
                  Save settings
                </button>
              </div>
            </form>
          </div>

          <div className="line">&nbsp;</div>

          {/* 密码修改表单 */}
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>

            <form
              className="form form-user-password"
              onSubmit={handleUpdatePwd}
            >
              <div className="form__group">
                <label className="form__label" htmlFor="password-current">
                  Current password
                </label>
                <input
                  id="password-current"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={curPwd}
                  onChange={(e) => setCurPwd(e.target.value)}
                  minLength="8"
                />
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="password">
                  New password
                </label>
                <input
                  id="password"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  minLength="8"
                />
              </div>

              <div className="form__group ma-bt-lg">
                <label className="form__label" htmlFor="password-confirm">
                  Confirm password
                </label>
                <input
                  id="password-confirm"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={confirmNewPwd}
                  onChange={(e) => setConfirmNewPwd(e.target.value)}
                  minLength="8"
                />
              </div>

              <div className="form__group right">
                <button className="btn btn--small btn--green btn--save-password">
                  Save password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Account;
