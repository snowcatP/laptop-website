import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT

export const forgotPassword = (email) => axios.post(URL + "/forgot-password", email)

export const resetPassword = (request) => axios.post(URL + "/reset-password", request)