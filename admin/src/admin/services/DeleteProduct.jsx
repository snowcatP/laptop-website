import axios from "axios";

const URL = "http://localhost:8080"

export const deleteProductById = (id) => axios.delete(URL + `/product/delete/${id}`)