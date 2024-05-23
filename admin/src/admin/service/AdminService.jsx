import axios from 'axios'

const URL = process.env.REACT_APP_API_ENDPOINT

export const adminLogin = (credential) => axios.post(URL + "/auth/admin-login", credential)

export const checkValidToken = (token) => axios.post(URL + "/auth/introspect", token)

export const adminProfile = (headers) => axios.get(URL + "/admin/profile", {headers})

export const adminLogout = (token) => axios.post(URL + "/auth/logout", token)