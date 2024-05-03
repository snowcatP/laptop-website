import axios from "axios";

const URL = "http://localhost:8080"

export const editProductById = (id,credential) => axios.put(URL + `/product/edit/${id}`,credential)