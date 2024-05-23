import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT

export const addProduct = (credential) => axios.post(URL + `/product/add`,credential)

export const getProductById = (id) => axios.get(URL + `/product/${id}`)

export const editProductById = (id,credential) => axios.put(URL + `/product/edit/${id}`,credential)

export const getListProducts = () => axios.get(URL + "/product")

export const deleteProductById = (id) => axios.delete(URL + `/product/delete/${id}`)

export const testProduct = (image) => axios.post(URL + "/product/test-add", image)
