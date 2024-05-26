import axios from 'axios';

const URL = process.env.REACT_APP_API_ENDPOINT

export const loginResult = (credential) => axios.post(URL + "/auth/login", credential);

export const customerProfile = (headers) => axios.get(URL + "/user/profile", {headers})

export const customerLogout = (token) => axios.post(URL + "/auth/logout", token)

export const customerRegister = (customer) => axios.post(URL + "/auth/register", customer)

export const checkValidToken = (token) => axios.post(URL + "/auth/introspect", token)

export const changePassword = (request, headers) => axios.put(URL + "/user/change-password", request, {headers})