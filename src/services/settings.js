/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const API_URL = import.meta.env.VITE_BACKEND_URL;

// type is either 'password' or 'data'
export async function updateSettings(data, type) {
  try {
    const url =
      type === 'password'
        ? `${API_URL}/api/v1/users/updateMyPassword`
        : `${API_URL}/api/v1/users/updateMe`;

    const res = await axios({
      method: 'PATCH',
      url,
      data,
      withCredentials: true,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}
