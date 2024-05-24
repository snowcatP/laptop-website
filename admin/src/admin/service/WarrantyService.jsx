import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT

export const getListWarrantys = () => axios.get(URL + "/warranty")

export const addWarranty = (credential,headers) => axios.post(URL + `/warranty/add`,credential,{ headers: headers })

export const getOrderByIdCustomer = (customerId, headers) => axios.get(URL + `/order/orders-of-customer/${customerId}`,{ headers: headers })

export const getOrders = (customerId, headers) => axios.get(URL + `orders-of-customer/${customerId}`,{ headers: headers })

export const deleteWarrantyById = (id,headers) => axios.delete(URL + `/warranty/delete/${id}`,{ headers: headers })

export const editWarrantyById = (id, request, headers) => axios.put(URL + `/warranty/edit/${id}`, request, {headers})

export const getWarrantyById = (id, headers) => axios.get(URL + `/warranty/${id}`, {headers})

