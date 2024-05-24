import axios from "axios";
const URL = process.env.REACT_APP_API_ENDPOINT

export const getCartById = (cartId,headers) => axios.get(URL+"/cart/"+cartId,{ headers: headers })
export const deleteItemToCart = (id, headers) => axios.post(URL+"/cart/" + `delete-to-cart/` + id, {}, { headers: headers });
export const editItemInCart = (id, new_quantity,headers) => axios.post(URL+"/cart/" + `edit-item-in-cart/${id}/${new_quantity}`, {},
{ headers: headers });