import axios from "axios";
const URL = "http://localhost:8080/order/"
export const getOrdersOfCustomer = (customerId, headers) => axios.get(URL + `orders-of-customer/${customerId}`,{ headers: headers })
export const checkout = (credential,headers) => axios.post(URL + "checkout", credential,{ headers: headers })
export const cancelOrder = (orderId,headers) => axios.post(URL + "cancel-order/"+orderId,{}, { headers: headers })
export const getBillsOfCustomer = (customerId,headers) => axios.get(URL + "bills-of-customer/"+customerId,{}, { headers: headers })