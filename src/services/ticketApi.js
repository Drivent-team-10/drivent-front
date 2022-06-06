/* eslint-disable no-console */
import api from './api';

export async function reserveTicket(body, token) {
  const response = await api.post('/payment', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}