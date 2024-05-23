import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT

export const addProduct = (credential,headers) => axios.post(URL + `/product/add`,credential,{ headers: headers })

export const getProductById = (id,headers) => axios.get(URL + `/product/${id}`,{ headers: headers })

export const editProductById = (id,credential,headers) => axios.put(URL + `/product/edit/${id}`,credential,{ headers: headers })

export const getListProducts = (headers) => axios.get(URL + "/product",{ headers: headers })

export const deleteProductById = (id,headers) => axios.delete(URL + `/product/delete/${id}`,{ headers: headers })
