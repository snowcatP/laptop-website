import axios from 'axios'

const URL = process.env.REACT_APP_API_ENDPOINT

export const getAllOrders = (headers) => axios.get(URL + "/order", {headers: headers});
export const changeOrderState = (orderId,  headers) => axios.post(URL + `/order/change-order-state/${orderId}`,{}, {headers: headers});

export const getCountOrders = (headers) => axios.get(URL + "/order/count", {headers: headers});

export const getRevenueOrders = (headers) => axios.get(URL + "/order/total-revenue", {headers: headers});

export const getTopSelling = (headers) => axios.get(URL + "/order/top-selling-products", {headers: headers});