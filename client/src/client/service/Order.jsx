import axios from "axios";
const URL = process.env.REACT_APP_API_ENDPOINT
export const getOrdersOfCustomer = (customerId, headers) => axios.get(URL + "/order/" + `orders-of-customer/${customerId}`,{ headers: headers })
export const checkout = (credential,headers) => axios.post(URL + "/order/"+ "checkout", credential,{ headers: headers })
export const cancelOrder = (orderId,headers) => axios.post(URL + "/order/"+ "cancel-order/"+orderId,{}, { headers: headers })
