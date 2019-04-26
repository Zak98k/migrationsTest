import axios from 'axios';
import {restURL} from '../baseURL';

export const auth = (data) => axios.post(`${restURL}/auth`, data);                     //выполняется запрос сервера и получаем файл с токеном (в data)
export const registration = (createAccountData) => axios.post(`${restURL}/reg`, createAccountData);

export const getDataFromTokenListener = (token) => axios.defaults.headers.common['Authorization'] = token;


