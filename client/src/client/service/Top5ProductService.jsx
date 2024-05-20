import axios from "axios";

const URL = process.env.REACT_APP_API_ENDPOINT

export const getTop5Products = () => axios.get(URL + "/product/top5price")