import axios from "axios";

const URL = "http://localhost:8080"

export const deleteProductById = (id,headers) => axios.delete(URL + `/product/delete/${id}`,{headers: headers})