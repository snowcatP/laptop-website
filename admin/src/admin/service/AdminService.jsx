import axios from 'axios'

const URL = "http://localhost:8080"

export const adminLogin = (credential) => axios.post(URL + "/auth/admin-login", credential)

export const checkValidToken = (token) => axios.post(URL + "/auth/introspect", token)

export const adminProfile = (headers) => axios.get(URL + "/admin/profile", {headers})