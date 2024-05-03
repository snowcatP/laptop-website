import axios from "axios";

const URL = "http://localhost:8080"

export const getProductById = (id) => axios.get(URL + `/product/${id}`)