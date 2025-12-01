/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function login(email, password) {
  try {
    const res = await axios({
      withCredentials: true,
      method: 'POST',
      url: `${API_URL}/api/v1/users/login`,
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        // location.assign('/');
      }, 1500);
      return res.data.data.user;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

export async function logout() {
  try {
    const res = await axios({
      withCredentials: true,
      method: 'GET',
      url: `${API_URL}/api/v1/users/logout`,
    });
    // if ((res.data.status = 'success')) return true;
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
}
