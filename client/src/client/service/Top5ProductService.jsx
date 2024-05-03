import axios from "axios";

const URL = "http://localhost:8080"

export const getTop5Products = () => axios.get(URL + "/product/top5price")