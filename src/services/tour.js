import axios from 'axios';
import { showAlert } from './alerts';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function getMyTours() {
  try {
    const res = await axios({
      withCredentials: true,
      method: 'GET',
      url: `${API_URL}/api/v1/tours/my-tours`,
    });

    if (res.data.status === 'success') {
      return res.data.data.tours;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

export async function getTours() {
  try {
    const res = await axios({
      withCredentials: true,
      method: 'GET',
      url: `${API_URL}/api/v1/tours`,
    });

    if (res.data.status === 'success') {
      return res.data.data.data;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

export async function getTour(slug) {
  try {
    const res = await axios({
      withCredentials: true,
      method: 'GET',
      url: `${API_URL}/api/v1/tours/slug/${slug}`,
    });

    if (res.data.status === 'success') {
      return res.data.data.tour;
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}

// export async function createOrder(newOrder) {
//   try {
//     const res = await fetch(`${API_URL}/order`, {
//       method: "POST",
//       body: JSON.stringify(newOrder),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) throw Error();
//     const { data } = await res.json();
//     return data;
//   } catch {
//     throw Error("Failed creating your order");
//   }
// }

// export async function updateOrder(id, updateObj) {
//   try {
//     const res = await fetch(`${API_URL}/order/${id}`, {
//       method: "PATCH",
//       body: JSON.stringify(updateObj),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) throw Error();
//     // We don't need the data, so we don't return anything
//   } catch (err) {
//     throw Error("Failed updating your order");
//   }
// }
