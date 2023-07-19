import axios from 'axios';

const BASE_URL = 'https://64b8205821b9aa6eb0799603.mockapi.io';

export const getContacts = async () => {
  const response = await axios.get(`${BASE_URL}/contacts`);
  return response.data;
};

export const createContact = async contact => {
  const response = await axios.post(`${BASE_URL}/contacts`, contact);
  return response.data;
};
