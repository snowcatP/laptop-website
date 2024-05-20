import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT

export const getProducts = () => axios.get(URL + "/product")


export const addToCart = (cartId, productId, quantity,headers ) => axios.post(URL + `/cart/add-to-cart/${cartId}/${productId}/${quantity}`,{}, { headers })