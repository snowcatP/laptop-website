import axios from 'axios'

const URL = process.env.REACT_APP_API_ENDPOINT

export const getAllDiscounts = (headers) => axios.get(URL + "/discount", {headers})

export const addNewDiscount = (newDiscountRequest, headers) => axios.post(URL + "/discount/add", newDiscountRequest, {headers})

export const getDiscountById = (id, headers) => axios.get(URL + `/discount/${id}`, {headers})

export const deleteDiscountById = (id, headers) => axios.delete(URL + `/discount/delete/${id}`, {headers})

export const getProductsByDiscountId = (id, headers) => axios.get(URL + `/discount/get-products/${id}`, {headers})

export const editDiscount = (id, request, headers) => axios.put(URL + `/discount/edit/${id}`, request, {headers})