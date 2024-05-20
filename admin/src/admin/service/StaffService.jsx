import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT

export const changeProfile = (profile, headers) => axios.post(URL + "/admin/changeProfile", profile, {headers})

export const changePassword = (passwordRequest, headers) => axios.post(URL + "/admin/changePassword", passwordRequest, {headers})