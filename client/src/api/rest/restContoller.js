import axios from 'axios';
import { restURL } from '../baseURL';

export const auth = (data) => axios.post(`${restURL}/auth`, data);                     //выполняется запрос сервера и получаем файл с токеном (в data)
export const registration = (createAccountData) => axios.post(`${restURL}/reg`, createAccountData);
// export const createContestListener = (createContestData, token) => axios.post(`${restURL}/contest`, createContestData, token);
// export const getContests = () => axios.get(`${restURL}/dashboard`);

export const getDataFromTokenListener = (token) => axios.defaults.headers.common['Authorization'] = token;






// export const getUserIdListener = (id) => axios.get(`${restURL}/token`, id);
//
// export const checkUser = (checkUserData) =>  axios.get(`${restURL}/user`, checkUserData);