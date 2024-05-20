import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT

export const getProductById = (id) => axios.get(URL + `/product/${id}`)