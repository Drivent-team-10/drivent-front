/* eslint-disable no-console */
import api from './api';

export async function reserveTicket(body, token) {
  const response = await api.post('/reservations', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data)

  return response.data;
}