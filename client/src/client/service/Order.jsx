import axios from "axios";
const URL = "http://localhost:8080/order/"
export const getOrders = (customerId, headers) => axios.get(URL + `orders-of-customer/${customerId}`,{ headers: headers })
export const checkout = (credential,headers) => axios.post(URL + "checkout", credential,{ headers: headers })