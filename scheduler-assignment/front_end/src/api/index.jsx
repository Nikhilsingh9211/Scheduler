
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const createAvailability = (data) => API.post('/availability', data);
export const getAvailability = (url) => API.get(`/booking/${url}`);
export const bookSlot = (data) => API.post('/booking', data);
export const createUser = (data) => API.post('/users', data);