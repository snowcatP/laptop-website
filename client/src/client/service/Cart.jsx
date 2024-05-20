import axios from "axios";
const URL = "http://localhost:8080/cart/"

export const getCartById = (cartId,headers) => axios.get(URL+cartId,{ headers: headers })
export const deleteItemToCart = (id, headers) => axios.post(URL + `delete-to-cart/` + id, {}, { headers: headers });
export const editItemInCart = (id, new_quantity,headers) => axios.post(URL + `edit-item-in-cart/${id}/${new_quantity}`, {},
{ headers: headers });