import axios from 'axios';

export const formDataApi = axios.create({
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const URLEncodedApi = axios.create({
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

export const rawApi = axios.create({
  headers: { 'Content-Type': 'application/json' },
});
