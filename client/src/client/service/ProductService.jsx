import axios from "axios";

const URL = "http://localhost:8080"

export const getProducts = () => axios.get(URL + "/product")