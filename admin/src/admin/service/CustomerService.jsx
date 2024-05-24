import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT


export const getCustomerById = (id,headers) => axios.get(URL + `/user/${id}`,{ headers: headers })


export const getListCustomers = (headers) => axios.get(URL + "/user",{ headers: headers })

export const getCountCustomers = (headers) => axios.get(URL + "/user/count", {headers: headers})



