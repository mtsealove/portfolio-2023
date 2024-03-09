import axios from 'axios';

const rest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default rest;
