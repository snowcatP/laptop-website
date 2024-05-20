import axios from "axios";

const URL = "http://localhost:8080"

export const getProducts = () => axios.get(URL + "/product")
export const addToCart = (cartId, productId, quantity,headers ) => axios.post(URL + `/cart/add-to-cart/${cartId}/${productId}/${quantity}`,{}, { headers })