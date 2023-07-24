import axios from 'axios';

const API_BASE_URL =
  'https://64b8205821b9aa6eb0799603.mockapi.io/contacts/contacts';

const contactsAPI = axios.create({
  baseURL: API_BASE_URL,
});

export const getContacts = async () => {
  const response = await contactsAPI.get('/');
  return response.data;
};

export const createContact = async contact => {
  const response = await contactsAPI.post('/', contact);
  return response.data;
};

export const updateContact = async (id, contact) => {
  const response = await contactsAPI.put(`/${id}`, contact);
  return response.data;
};

export const deleteContact = async id => {
  await contactsAPI.delete(`/${id}`);
};
