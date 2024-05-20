import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT


export const getCustomerById = (id) => axios.get(URL + `/user/${id}`)


export const getListCustomers = () => axios.get(URL + "/user")

