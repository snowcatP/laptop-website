import axios from 'axios';

const URL = "http://localhost:8080";

export const loginResult = (credential) => axios.post(URL + "/auth/login", credential);

export const customerProfile = (headers) => axios.get(URL + "/user/profile", {headers})