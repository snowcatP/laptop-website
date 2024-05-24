import axios from 'axios'

const URL = process.env.REACT_APP_API_ENDPOINT

export const getAllOrders = (headers) => axios.get(URL + "/order", {headers});
export const changeOrderState = (orderId,  headers) => axios.post(URL + `/order/change-order-state/${orderId}`,{}, {headers});